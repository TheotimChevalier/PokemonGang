import { Socket } from 'socket.io';
import { MysqlPokemonGang, SocketPokemon, db } from '../../lib';

let indexConnect = 0;
const existingPlayer = new Map<number, Socket>();
const showLog = true;

export async function handleWorldEvents(socket: Socket) {
  //@ts-ignore
  const useCookie = socket.cookie as string | undefined;
  if(!useCookie) return;
  const cookieSpited = useCookie.split(';');
  const tokenCookie = cookieSpited.find(i => i.trim().startsWith('token='));
  if(!tokenCookie) return;
  const token = tokenCookie.trim().replace('token=', '');
  const reqUser = await db.query('SELECT id, username, x, y, rotation FROM users WHERE token = ?', [token]) as MysqlPokemonGang<'users'>;
  if(reqUser.length) {
    if(showLog) console.log('connection', indexConnect++, reqUser[0].username, socket.id)
    const playerisPlayed = existingPlayer.get(reqUser[0].id);

    if (playerisPlayed) {
      console.log('deleteSelf', indexConnect++, reqUser[0].username, socket.id)
      playerisPlayed.emit('deleteSelf', {});
    };

    existingPlayer.set(reqUser[0].id, socket);

    socket.on('initPlayer', () => {
      if(showLog) console.log('initPlayer', indexConnect++, reqUser[0].username)
      socket.broadcast.emit('initPlayerRequest', {});
    });

    socket.on('disconnect', () => {
      if(showLog) console.log('disconnect', indexConnect++, reqUser[0].username)
      socket.broadcast.emit('playerDisconnected', {id:socket.id});
      existingPlayer.delete(reqUser[0].id);
    });

    socket.on('playerMove', async (data:SocketPokemon<'playerMove'>) => {
      //if(showLog) console.log('playerMove', indexConnect++, reqUser[0].username)
      socket.broadcast.emit('playerMoved', 
      {
        id:socket.id, 
        x:data.x,
        y:data.y, 
        rotation:data.rotation, 
        teleport:data.teleport, 
        //animation:data.animation,
        scale: data.scale,
        skin:data.skin,
        scene:data.scene, 
        world:data.world,
        username:reqUser[0].username
      });
    });

    socket.on('updatePlayerAnimation', async (data:SocketPokemon<'updatePlayerAnimation'>) => {
      socket.broadcast.emit('updatePlayerAnimationPlayer', {
        id: socket.id,
        animation:data.animation,
        skin:data.skin,
        scene:data.scene, 
        world:data.world,
      });
    });
    

    socket.on('saveLastPosition', async (data:SocketPokemon<'saveLastPosition'>) => {
      if(showLog) console.log('saveLastPosition', reqUser[0].username)
      const reqUserExist = await db.query('SELECT id FROM users WHERE token = ?', [token]) as MysqlPokemonGang<'users'>;
      if(reqUserExist.length) db.query(`UPDATE users SET x = ?, y = ?, rotation = ?, world = ?, skin = ? WHERE token = ?`, [data.x, data.y, data.rotation, data.world, data.skin, token]);
    });
  };
};