import { MysqlError } from "mysql";
import { PlayerSkin, PokemonLevelingRate } from "./enum";

type MysqlItems = {
  id:number;
  name:string;
  type:number;
  description:string;
  spritesheet:string;
};

type MysqlItemsMap = {
  id:number;
  world:number;
  id_item:number;
  value:number;
  x:number;
  y:number;
};

type MysqlItemsMapUsers = {
  id:number;
  id_item_map:number;
  id_user:number;
};

type MysqlItemsUsers = {
  id:number;
  id_user:number;
  id_item:number;
  value:number;
};

type MysqlItemType = {
  id:number;
  name:string;
};

type MysqlPokemons = {
  id: number;
  name:string;
  gender: number;
  catch_rate:number;
  hatch_time_min: number;
  hatch_time_max: number;
  height:number;
  weight:number;
  base_exp_yield:number;
  ev_yield_hp:number;
  ev_yield_atk:number;
  ev_yield_def:number;
  ev_yield_sp_atk:number;
  ev_yield_sp_def:number;
  ev_yield_speed: number;
  color:number;
  leveling_rate:number;
  base_firendship:number;
  base_stats_hp:number;
  base_stats_atk:number;
  base_stats_def:number;
  base_stats_sp_atk:number;
  base_stats_sp_def:number;
  base_stats_speed:number
};

type MysqlZones = {
  id:number;
  name:string;
  id_world:MysqlWorlds["id"];
  start_x:number;
  start_y:number;
  end_x:number;
  end_y:number;
};

type MysqlZoneEncounters = {
  id:number;
  id_zone:MysqlZones["id"];
  id_pokemon:MysqlPokemons["id"];
  rate:number;
  level_min:number;
  level_max:number;
};

type MysqlWorlds = {
  id:number;
  wolrds:string;
};

type MysqlTypes = {
  id:number;
  name:string;
  normal:number;
  fighting:number;
  flying:number;
  poison:number;
  ground:number;
  rock:number;
  bug:number;
  ghost:number;
  steel:number;
  fire:number;
  water:number;
  grass:number;
  electric:number;
  psychic:number;
  ice:number;
  dragon:number;
  dark:number;
  fairy:number;
};

type MysqlPokemonTypes = {
  id:number;
  id_pokemon:number;
  id_type:number;
};

type MysqlPokemonLevelingRate = {
  id:PokemonLevelingRate;
  name:string;
}

type MysqlColors = {
  id:number;
  name:string;
};

type MysqlUser = {
  id:number;
  token:string;
  username:string;
  password:string;
  pokedollar:number;
  x:number;
  y:number;
  rotation:number;
  world:number;
  skin:PlayerSkin;
};

type MysqlUsersPokemons = {
  id: number;
  id_user: number;
  id_pokemon: number;
  surname?: string;
  hp:number;
  xp: number;
  gender:number;
  nature: number;
  stat_nature: number;
  ability: number;
  friendship: number;
  origin_world: number;
  origin_pokeball: number;
  origin_level: number;
  origin_date: number;
  iv_hp: number;
  iv_atk: number;
  iv_def: number;
  iv_sp_atk: number;
  iv_sp_def: number;
  iv_speed: number;
  ev_yield_hp: number;
  ev_yield_atk: number;
  ev_yield_def: number;
  ev_yield_sp_atk: number;
  ev_yield_sp_def: number;
  ev_yield_speed: number;
  move_0: number;
  move_1: number;
  move_2: number;
  move_3: number;
  move_0_pp: number;
  move_1_pp: number;
  move_2_pp: number;
  move_3_pp: number;
  location:number;
  shiny:number;
}

type MysqlMoves = {
  id:number;
  name:string;
  pp:number;
  max_pp:number;
  power:number;
  accuracy:number;
  category:MysqlMoveCategories["id"];
  target:MysqlMoveTargets["id"];
  priority:number;
  critical_hit:number;
  makes_contact:number;
  affected_by_protect:number;
  affected_by_magic_coat:number;
  affected_by_snatch:number;	
	affected_by_mirror_move: number;
	affected_by_kings_rock: number;
}

type MysqlMoveTargets = {
  id:number;
  name:string;
};

type MysqlMoveCategories = {
  id:number;
  name:string;
};

type MysqlPokemonsMoves = {
  id:number;
  id_pokemon:MysqlPokemons["id"];
  id_move:MysqlMoves["id"];
  level?:number;
  tm?:number;
  egg_move?:number
};

export type ListeTables = 'items' | 'items_map' | 'items_map_users' | 'items_users' | 'item_type' |'users' | 'pokemons' | 'types' | 'pokemon_types' | 'colors' | 'users_pokemons' | 'zone_encounters' | 'zones' | 'worlds' | 'pokemon_leveling_rate' | 'moves' | 'move_categories' | 'move_targets' | 'pokemons_moves'

export type MysqlPokemonGang<T extends ListeTables> = 
T extends 'items' ? MysqlItems[] :
T extends 'items_map' ? MysqlItemsMap[] :
T extends 'items_map_users' ? MysqlItemsMapUsers[] :
T extends 'items_users' ? MysqlItemsUsers[] :
T extends 'item_type' ? MysqlItemType[] :
T extends 'pokemons' ? MysqlPokemons[] :
T extends 'types' ? MysqlTypes[] :
T extends 'users' ? MysqlUser[] :
T extends 'pokemon_types' ? MysqlPokemonTypes[] : 
T extends 'colors' ? MysqlColors[] : 
T extends 'users_pokemons' ? MysqlUsersPokemons[] : 
T extends 'zone_encounters' ? MysqlZoneEncounters[] : 
T extends 'zones' ? MysqlZones[] : 
T extends 'worlds' ? MysqlWorlds[] : 
T extends 'pokemon_leveling_rate' ? MysqlPokemonLevelingRate[] : 
T extends 'moves' ? MysqlMoves[] : 
T extends 'move_categories' ? MysqlMoveCategories[] : 
T extends 'move_targets' ? MysqlMoveTargets[] : 
T extends 'pokemons_moves' ? MysqlPokemonsMoves[] : 
undefined | MysqlError;