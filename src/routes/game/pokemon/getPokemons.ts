import { Router } from 'express';
import path from 'path';
import { MysqlPokemonGang, cacheServer, db } from '../../../lib';
const router = Router();

const pathLoginPage = path.join(__dirname, '../../../../public/components/login/index.html');


router.get('/', async (req, res) => {
  res.json({pokemons:[...cacheServer.pokemon.pokemons], total: cacheServer.pokemon.pokemons.size});
});

export default router;