import { Socket } from 'socket.io';
import { MysqlPokemonGang, SocketPokemon, db } from '../../lib';

export function handleLoginEvents(socket: Socket) {

  socket.on('getmyidsocket', async (data) => {
    socket.emit('myid', {id:socket.id});
  })
  /*socket.on('loginAttempt', async (data:SocketPokemon<'loginAttempt'>) => {
    const {username, password } = data;
    const reqUsers = await db.query(`SELECT id FROM users WHERE username = ? AND password = ?`, [username, password]) as MysqlPokemonGang<'users'>;

    if(reqUsers.length) {
      const token = generateUniqueToke().split('.')[2];
      db.query(`UPDATE users SET token = ? WHERE id = ?`, [token, reqUsers[0].id]);
      
      res.cookie('token', token, {
        expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), 
        httpOnly: true,
      });
  
      res.redirect('/');
    } else {
      req.session.errorMessage = "Nom d'utilisateur ou mot de passe invalide.";
      res.redirect('/');
      //res.sendFile(path.join(__dirname, '../../../public/components/login/index.html'));
    }
  });*/
};