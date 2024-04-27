import { Router } from 'express';
import { db } from '../../../lib/database';
import { MysqlPokemonGang } from '../../../lib/types/typeSql';
import path from 'path';

const router = Router();
const pathLoginPage = path.join(__dirname, '../../../public/components/login/index.html');

router.get('/', async (req, res) => {
  const cookieToken = req.cookies.token;
  if(!cookieToken) return res.sendFile(pathLoginPage)

  const reqUser = await db.query('SELECT x, y, rotation FROM users WHERE token = ?', [cookieToken]) as MysqlPokemonGang<'users'>;
  if(reqUser.length) {
    return res.json({x:reqUser[0].x,y:reqUser[0].y,rotation:reqUser[0].rotation});
  } else {
    return res.sendFile(pathLoginPage)
  };
});

export default router;