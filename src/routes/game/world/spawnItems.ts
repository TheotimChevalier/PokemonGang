import { Router } from 'express';
import path from 'path';
import { MysqlPokemonGang, db } from '../../../lib';
const router = Router();

const pathLoginPage = path.join(__dirname, '../../../../public/components/login/index.html');


router.get('/', async (req, res) => {
  const cookieToken = req.cookies.token as string | undefined;
  if(!cookieToken) return res.sendFile(pathLoginPage);

  const reqItemsMap = await db.query(`SELECT b.*, d.spritesheet
  FROM users a
  JOIN items_map b ON a.world = b.world JOIN items d ON b.id_item = d.id
  WHERE a.token = ?
    AND NOT EXISTS (
      SELECT 1
      FROM items_map_users c
      WHERE c.id_user = a.id
        AND c.id_item_map = b.id
    );`, [cookieToken]) as MysqlPokemonGang<'items_map'>;

  res.json({items: reqItemsMap})
})

export default router;