import { Router } from 'express';
import path from 'path';
import { MysqlPokemonGang, db } from '../../../lib';
const router = Router();

const pathLoginPage = path.join(__dirname, '../../../../public/components/login/index.html');

type MysqlCustomReqItems = {
  id:number;
  name:string;
  value:number;
  spritesheet:string;
};

router.get('/', async (req, res) => {
  const cookieToken = req.cookies.token as string | undefined;
  if(!cookieToken) return res.sendFile(pathLoginPage);

  const reqItemsUser = await db.query(`SELECT b.id, c.name, b.value, c.description, c.type, c.spritesheet FROM users a JOIN items_users b ON a.id = b.id_user JOIN items c ON b.id_item = c.id WHERE a.token = ?`, [cookieToken]) as MysqlCustomReqItems[];

  res.json({items: reqItemsUser})
})

export default router;