import { db } from "../database";
import { MysqlPokemonGang } from "../types/typeSql";

export const cacheServer = {
  pokemon: {
    types: new Map<number, MysqlPokemonGang<'types'>[0]>(),
    colors: new Map<number, MysqlPokemonGang<'colors'>[0]>(),
    pokemon_types: new Map<number, MysqlPokemonGang<'pokemon_types'>[0]>(),
    pokemons: new Map<number, MysqlPokemonGang<'pokemons'>[0]>(),
    pokemon_leveling_rate: new Map<number, MysqlPokemonGang<'pokemon_leveling_rate'>[0]>(),
  },
  zones: {
    zones: new Map<number, MysqlPokemonGang<'zones'>[0]>(),
    zone_encounters: new Map<number, MysqlPokemonGang<'zone_encounters'>[0]>(),
  },
  moves: {
    moves: new Map<number, MysqlPokemonGang<'moves'>[0]>(),
    pokemons_moves: new Map<number, MysqlPokemonGang<'pokemons_moves'>[0]>(),
  }
};

export async function synchro() {
  console.log('synchro')
  const reqTypes = await db.query('SELECT * FROM types') as MysqlPokemonGang<'types'>;
  const reqPokemons = await db.query('SELECT * FROM pokemons') as MysqlPokemonGang<'pokemons'>;
  const reqPokemonTypes = await db.query('SELECT * FROM pokemon_types') as MysqlPokemonGang<'pokemon_types'>;
  const reqColors = await db.query('SELECT * FROM colors') as MysqlPokemonGang<'colors'>;
  const reqPokemonLevelingRate = await db.query('SELECT * FROM pokemon_leveling_rate') as MysqlPokemonGang<'pokemon_leveling_rate'>;

  reqTypes.forEach(i => cacheServer.pokemon.types.set(i.id, i));
  reqColors.forEach(i => cacheServer.pokemon.colors.set(i.id, i));
  reqPokemonTypes.forEach(i => cacheServer.pokemon.pokemon_types.set(i.id, i));
  reqPokemons.forEach(i => cacheServer.pokemon.pokemons.set(i.id, i));
  reqPokemonLevelingRate.forEach(i => cacheServer.pokemon.pokemon_leveling_rate.set(i.id, i));


  const reqZones = await db.query('SELECT * FROM zones') as MysqlPokemonGang<'zones'>;
  const reqzoneEncounters = await db.query('SELECT * FROM zone_encounters') as MysqlPokemonGang<'zone_encounters'>;

  reqZones.forEach(i => cacheServer.zones.zones.set(i.id, i));
  reqzoneEncounters.forEach(i => cacheServer.zones.zone_encounters.set(i.id, i));


  const reqMoves = await db.query('SELECT * FROM moves') as MysqlPokemonGang<'moves'>;
  const reqPokemonsMoves = await db.query('SELECT * FROM pokemons_moves') as MysqlPokemonGang<'pokemons_moves'>;

  reqMoves.forEach(i => cacheServer.moves.moves.set(i.id, i));
  reqPokemonsMoves.forEach(i => cacheServer.moves.pokemons_moves.set(i.id, i));
};