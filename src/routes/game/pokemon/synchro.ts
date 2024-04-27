import { Router } from 'express';
import path from 'path';
import { cacheServer, pokemonsSpriteBack, pokemonsSpriteFront } from '../../../lib';
const router = Router();


router.get('/', async (req, res) => {
  console.log('/synchro pokemon client')
  res.json({
    types: [...cacheServer.pokemon.types.values()],
    colors: [...cacheServer.pokemon.colors.values()],
    pokemon_types: [...cacheServer.pokemon.pokemon_types.values()],
    pokemons: [...cacheServer.pokemon.pokemons.values()],
    pokemon_leveling_rate: [...cacheServer.pokemon.pokemon_leveling_rate.values()],

    zones: [...cacheServer.zones.zones.values()],
    zone_encounters: [...cacheServer.zones.zone_encounters.values()],

    moves: [...cacheServer.moves.moves.values()],
    pokemons_moves: [...cacheServer.moves.pokemons_moves.values()],

    sprites: {
      front: pokemonsSpriteFront,
      back: pokemonsSpriteBack
    }
  });
});

export default router;