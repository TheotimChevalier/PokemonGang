import { Router } from 'express';
import { MysqlPokemonGang, cacheServer, db } from '../../../../lib';
import path from 'path';

const router = Router();

const pathLoginPage = path.join(__dirname, '../../../../public/components/login/index.html');

router.get('/', async (req, res) => {
  const cookieToken = req.cookies.token as string | undefined;
  if(!cookieToken) return res.sendFile(pathLoginPage);

  const reqPokemons = await db.query(`SELECT up.* FROM users u JOIN users_pokemons up ON u.id = up.id_user WHERE u.token = ? AND up.location BETWEEN 0 AND 5`, [cookieToken]) as MysqlPokemonGang<'users_pokemons'>;

  
  res.json({
    pokemons: reqPokemons
  });
});

export default router;