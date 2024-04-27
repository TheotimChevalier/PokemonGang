import bodyParser from 'body-parser';
import express from 'express';
import session, { SessionData } from 'express-session';
import http from 'http';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server  } from 'socket.io';
import { address } from 'ip';

import { secretKey, port, secretkeySession } from './config.json';
import { MysqlPokemonGang, db, synchro } from './lib';

import * as socketEvents from './socket';

declare module 'express-session' {
  interface SessionData {
      errorMessage?: string;
  }
};

/*declare module 'express' {
  interface Request {
    cookies: {
      token?:string
    }
  }
}*/

async function main() {

  synchro();

  const ipLocal = address();

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  const { default: routes } = await import('./routes');

  const pathLoginPage = path.join(__dirname, '../public//components/login/index.html');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());
  app.use(cookieParser(secretKey));
  app.use(bodyParser.json());
  app.use(session({
    secret: secretkeySession, 
    resave: true,
    saveUninitialized: true,
  }));
  app.set('io', io);

  io.use((socket, next) => {
    const cookie = socket.request.headers.cookie;
    //@ts-ignore
    socket.cookie = cookie;
    next();
  });

  app.get('/', async (req, res) => {
    const token = req.cookies.token;

    if(!token) {
      res.sendFile(pathLoginPage);
    } else {
      const reqUsers = await db.query(`SELECT username FROM users WHERE token = ?`, [token]) as MysqlPokemonGang<'users'>;
      if(!reqUsers.length) return res.sendFile(pathLoginPage);
      res.sendFile(path.join(__dirname, '../public/index.html'));
    };
  });

  app.use('/api', routes);


  io.on('connection', async (socket) => {
    socketEvents.handleLoginEvents(socket);
    socketEvents.handleWorldEvents(socket);

  })

  app.use(express.static('public'));
  server.listen(3000, '0.0.0.0', () => { console.log(`http://${ipLocal}:${port}`) });
};

main();