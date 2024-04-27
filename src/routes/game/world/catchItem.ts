import { Router } from 'express';
import path from 'path';
import { MysqlPokemonGang, db } from '../../../lib';
const router = Router();

const pathLoginPage = path.join(__dirname, '../../../../public/components/login/index.html');


router.post('/', async (req, res) => {
  const cookieToken = req.cookies.token as string | undefined;
  if(!cookieToken) return res.sendFile(pathLoginPage);

  const idItemMap = req.body.id;
  const idItemItemMap = req.body.idItem;
  const valueItemMap = req.body.value;

  const reqUsers = await db.query(`SELECT id FROM users WHERE token = ?`, [cookieToken]) as MysqlPokemonGang<'users'>;

  if(reqUsers.length) {
    db.query(`INSERT INTO items_map_users (id_item_map, id_user) VALUES (?, ?)`, [idItemMap, reqUsers[0].id]);
    const reqItemsUser = await db.query(`SELECT id, value FROM items_users WHERE id_user = ? AND id_item = ?`, [reqUsers[0].id, idItemItemMap]) as MysqlPokemonGang<'items_users'>;
    
    if(!reqItemsUser.length) {
      db.query(`INSERT INTO items_users (id_user, id_item, value) VALUES (?, ?, ?)`, [reqUsers[0].id, idItemItemMap, valueItemMap]);
    } else {
      db.query(`UPDATE items_users SET value = ? WHERE id = ?`, [reqItemsUser[0].value + valueItemMap, reqItemsUser[0].id]);
    }

    res.sendStatus(200);
  } else {
    res.redirect('/');
  };
});

export default router;