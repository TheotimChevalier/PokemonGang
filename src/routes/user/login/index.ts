import { Router } from 'express';
import { MysqlPokemonGang, db, generateUniqueToken } from '../../../lib';
import { Server } from 'socket.io';

const router = Router();

router.post('/', async (req, res) => {

  const io:Server = req.app.get('io');

  //console.log('/api/user/login', req.body);
  const username = req.body.username;
  const password = req.body.password;
  const socketId = req.body.socketId;

  const reqUsers = await db.query(`SELECT id FROM users WHERE username = ? AND password = ?`, [username, password]) as MysqlPokemonGang<'users'>;
  
  if(reqUsers.length) {
    const token = generateUniqueToken().split('.')[2];
    db.query(`UPDATE users SET token = ? WHERE id = ?`, [token, reqUsers[0].id]);
    
    res.cookie('token', token, {
      expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), 
      httpOnly: true,
    });

    res.redirect('/');
  } else {
    io.to(socketId).emit('userErrorLogin', {message:'Mot de passe ou nom d\'utilisateur invalide !'});
    //req.session.errorMessage = "Nom d'utilisateur ou mot de passe invalide.";
    //res.redirect('/');
    //res.sendFile(path.join(__dirname, '../../../public/components/login/index.html'));
  }
})

export default router;