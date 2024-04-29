/**
 * @typedef {Object} CacheClientTypes
 * @property {number} id
 * @property {string} name
 * @property {number} normal
 * @property {number} fighting
 * @property {number} flying
 * @property {number} poison
 * @property {number} ground
 * @property {number} rock
 * @property {number} bug
 * @property {number} ghost
 * @property {number} steel
 * @property {number} fire
 * @property {number} water
 * @property {number} grass
 * @property {number} electric
 * @property {number} psychic
 * @property {number} ice
 * @property {number} dragon
 * @property {number} dark
 * @property {number} fairy
 */

/**
 * @typedef {Object} CacheClientColors
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} CacheClientPokemonTypes
 * @property {number} id
 * @property {number} id_pokemon
 * @property {number} id_type
 */

/**
 * @typedef {Object} CacheClientPokemons
 * @property {number} id
 * @property {string} name
 * @property {number} gender
 * @property {number} catch_rate
 * @property {number} hatch_time_min
 * @property {number} hatch_time_max
 * @property {number} height
 * @property {number} weight
 * @property {number} base_exp_yield
 * @property {number} ev_yield_hp
 * @property {number} ev_yield_atk
 * @property {number} ev_yield_def
 * @property {number} ev_yield_sp_atk
 * @property {number} ev_yield_sp_def
 * @property {number} ev_yield_speed
 * @property {number} color
 * @property {number} leveling_rate
 * @property {number} base_firendship
 * @property {number} base_stats_hp
 * @property {number} base_stats_atk
 * @property {number} base_stats_def
 * @property {number} base_stats_sp_atk
 * @property {number} base_stats_sp_def
 * @property {number} base_stats_speed
 */

/**
 * @typedef {Object} CacheClientPokemonLevelingRate
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} CacheClientZones
 * @property {number} id
 * @property {string} name
 * @property {number} id_world
 * @property {number} start_x
 * @property {number} start_y
 * @property {number} end_x
 * @property {number} end_y
 */

/**
 * @typedef {Object} CacheClientZoneEncounters
 * @property {number} id
 * @property {number} id_zone
 * @property {number} id_pokemon
 * @property {number} rate
 * @property {number} level_min
 * @property {number} level_max
 */

/**
 * @typedef {Object} CacheClientMoves
 * @property {number} id
 * @property {string} name
 * @property {number} pp
 * @property {number} max_pp
 * @property {number} power
 * @property {number} accuracy
 * @property {number} category
 * @property {number} target
 * @property {number} priority
 * @property {number} critical_hit
 * @property {number} makes_contact
 * @property {number} affected_by_protect
 * @property {number} affected_by_magic_coat
 * @property {number} affected_by_snatch	
 * @property {number} affected_by_mirror_move
 * @property {number} affected_by_kings_rock
 */

/**
 * @typedef {Object} CacheClientPokemonsMoves
 * @property {number} id
 * @property {number} id_pokemon
 * @property {number} id_move
 * @property {number} level?
 * @property {number} tm?
 * @property {number} egg_move?
 */

/**
 * @typedef {Object} CacheClientSpriteJson
 * @property {string} name
 * @property {number} frameWidth
 * @property {number} frameHeight
 * @property {number} frames
 */

/**
 * @typedef {Object} CacheClientSprites
 * @property {Array<CacheClientSpriteJson>} front
 * @property {Array<CacheClientSpriteJson>} back
 */

/**
 * @typedef {Object} CacheClient
 * @property {Array<CacheClientTypes>} types
 * @property {Array<CacheClientColors>} colors
 * @property {Array<CacheClientPokemonTypes>} pokemon_types
 * @property {Array<CacheClientPokemons>} pokemons
 * @property {Array<CacheClientPokemonLevelingRate>} pokemon_leveling_rate
 * 
 * @property {Array<CacheClientZones>} zones
 * @property {Array<CacheClientZoneEncounters>} zone_encounters
 * 
 * @property {Array<CacheClientMoves>} moves
 * @property {Array<CacheClientPokemonsMoves>} pokemons_moves
 * 
 * @property {Array<CacheClientSprites>} sprites
 * 
 */

/**
 * @type {CacheClient}
 */
const cacheClient = {
  types: [],
  colors: [],
  pokemon_types: [],
  pokemons: [],
  pokemon_leveling_rate: [],

  zones: [],
  zone_encounters: [],

  moves: [],
  pokemons_moves: [],

  sprites: {
    front: [],
    back: []
  }
};

function synchroCache() {
  fetch('/api/game/pokemon/synchro')
  .then(response => response.json())
  .then(data => {
    cacheClient.types = data.types;
    cacheClient.colors = data.colors;
    cacheClient.pokemon_types = data.pokemon_types;
    cacheClient.pokemons = data.pokemons;
    cacheClient.pokemon_leveling_rate = data.pokemon_leveling_rate;
    cacheClient.zones = data.zones;
    cacheClient.zone_encounters = data.zone_encounters;
    cacheClient.moves = data.moves;
    cacheClient.pokemons_moves = data.pokemons_moves;

    cacheClient.sprites.front = data.sprites.front;
    cacheClient.sprites.back = data.sprites.back;
  });
};

export { cacheClient, synchroCache };