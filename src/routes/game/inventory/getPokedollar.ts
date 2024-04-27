import { Router } from 'express';
import path from 'path';
import { MysqlPokemonGang, db } from '../../../lib';
const router = Router();

const pathLoginPage = path.join(__dirname, '../../../../public/components/login/index.html');


router.get('/', async (req, res) => {
  const cookieToken = req.cookies.token as string | undefined;
  if(!cookieToken) return res.sendFile(pathLoginPage);

  const reqItemsUser = await db.query(`SELECT pokedollar FROM users WHERE token = ?`, [cookieToken]) as MysqlPokemonGang<'users'>;

  if(!reqItemsUser.length) return res.sendFile(pathLoginPage);

  res.json({pokedollar: reqItemsUser[0].pokedollar});
});

export default router;