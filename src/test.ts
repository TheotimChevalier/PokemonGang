/*import { readdirSync } from 'fs';
import listItems from '../ressources/assets/json/items.json';
import jsonDataImage from '../public/assets/img/items/items_spritesheet.json';
import path from 'path';

const listeType:string[] = [
  'Pokeballs',    
  'Medicine',     
  'Battle items', 
  'General items',
  'Hold items',   
  'Key Items',    
  'Berries',      
  'Machines'      
]

const imageArray = readdirSync(path.join(__dirname, '../ressources/assets/sprites-master/sprites/items'));

type ItemMap = {
  id:number;
  name:string;
  type:number;
  description:string;
  image:string;
};

const itemMap = new Map<number, ItemMap>();

listItems.slice(500).forEach(i => { //
  const nameJson = i.name
  const name = (typeof nameJson != 'string' ? nameJson.english : 'place_holder')

  const image = (imageArray.find(x => x === name.replace(/ /gi, '-').replace(/é/gi, 'e').toLowerCase() + '.png') || 'data-card-01').replace('.png', '');

  const type = listeType.indexOf(i.type) + 1

  itemMap.set(
    i.id,
    {
      id: i.id,
      name: name.replace(/'/gi, "\\'"),
      type: type,
      description: i.description.replace(/'/gi, "\\'"),
      image: image
    }
  );
});

setTimeout(() => {
  itemMap.forEach(i => {
    const itemJson = jsonDataImage.find(x => x.name === i.image)!;
    const x = itemJson.position.x / 30;
    const y = (itemJson.position.y / 30) * 30;
    console.log(`UPDATE items SET spritesheet = ${x + y} WHERE id = ${i.id};`)
  })
}, 5000);*/

//import pokemonJSON from '../ressources/assets/oakdex-pokedex-master/data/pokemon/bulbasaur.json';
/*
const alltype = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy"
]

const color = [
  'None',
  'White', 'Brown',
  'Gray',  'Yellow',
  'Red',   'Purple',
  'Blue',  'Green',
  'Pink',  'Black'
];

const leveling_rate = [
  'Slow',       
  'Medium Fast',
  'Medium Slow',
  'Fast',       
  'Erratic',    
  'Fluctuating' 
]

function createInsert(pokemonJSON:any) {
  const pokemonType:number[] = [];

  //@ts-ignore
  pokemonJSON.types.forEach(i => pokemonType.push(alltype.indexOf(i)));
  
  const genderratios = pokemonJSON.gender_ratios || {male:0,female:0};
  const gender = !(genderratios.male + genderratios.female) ? -1 : genderratios.male
  const pokemon = {
    id: pokemonJSON.national_id,
    name: "'" + pokemonJSON.names.fr + "'",
    gender: +`${gender}`.split('.')[0],
    catch_rate: pokemonJSON.catch_rate,
  
    hatch_time_min: pokemonJSON.hatch_time[0],
    hatch_time_max: pokemonJSON.hatch_time[1],
  
    height: pokemonJSON.height_eu.split(' ')[0], 
    weight: pokemonJSON.weight_eu.split(' ')[0],
  
    base_exp_yield: pokemonJSON.base_exp_yield,
    ev_yield_hp: pokemonJSON.ev_yield.hp,
    ev_yield_atk: pokemonJSON.ev_yield.atk,
    ev_yield_def: pokemonJSON.ev_yield.def,
    ev_yield_sp_atk: pokemonJSON.ev_yield.sp_atk,
    ev_yield_sp_def: pokemonJSON.ev_yield.sp_def,
    ev_yield_speed: pokemonJSON.ev_yield.speed,
  
    color: color.indexOf(pokemonJSON.color),
    leveling_rate: leveling_rate.indexOf(pokemonJSON.leveling_rate) + 1,

    base_firendship: pokemonJSON.base_friendship,
  
    base_stats_hp: pokemonJSON.base_stats.hp,
    base_stats_atk: pokemonJSON.base_stats.atk,
    base_stats_def: pokemonJSON.base_stats.def,
    base_stats_sp_atk: pokemonJSON.base_stats.sp_atk,
    base_stats_sp_def: pokemonJSON.base_stats.sp_def,
    base_stats_speed: pokemonJSON.base_stats.speed,
  };
  
  const sqlInsert:string[] = []; 
  const keyPokemon = Object.keys(pokemon);
  keyPokemon.forEach(key => {
    //@ts-ignore
    sqlInsert.push(pokemon[key])
  })
  

  return {sqlInsert: '(' + sqlInsert.join(', ') + ')', type:pokemonType.map(i => `(${pokemon.id},${i})`).join(', ')}
}

import { writeFile } from 'fs';
import pokemonsJSON from '../ressources/assets/oakdex-pokedex-master/data/pokemon.json';

const allPokemons:string[] = [];
const allTypes:string[] = [];


const keyPokemon = Object.keys(pokemonsJSON);

keyPokemon.forEach(key => {
  //@ts-ignore
  const pokemon = pokemonsJSON[key]!;
  const sqlInsert = createInsert(pokemon);

  allPokemons.push(sqlInsert.sqlInsert);
  allTypes.push(sqlInsert.type);
});

const finalOutput = "INSERT INTO `pokemons`(`id`, `name`, `gender`, `catch_rate`, `hatch_time_min`, `hatch_time_max`, `height`, `weight`, `base_exp_yield`, `ev_yield_hp`, `ev_yield_atk`, `ev_yield_def`, `ev_yield_sp_atk`, `ev_yield_sp_def`, `ev_yield_speed`, `color`, `leveling_rate`, `base_firendship`, `base_stats_hp`, `base_stats_atk`, `base_stats_def`, `base_stats_sp_atk`, `base_stats_sp_def`, `base_stats_speed`) VALUES " + allPokemons.join(', ') + ';' +
"INSERT INTO `pokemon_types`(`id_pokemon`, `id_type`) VALUES " + allTypes.join(', ') + ';';



writeFile('monObjet.txt', finalOutput, 'utf8', function(err) {
  if (err) {
      console.log("Une erreur est survenue lors de l'écriture du fichier texte", err);
  } else {
      console.log("Fichier texte enregistré avec succès !");
  }
});*/

/*

 ('[value-1]','[value-2]','[value-3]')
*/

/*
import pokemonsJson from '../ressources/assets/oakdex-pokedex-master/data/pokemon.json';

const color:string[] = [];

const pokemonKey = Object.keys(pokemonsJson);

pokemonKey.forEach(key => {
  //@ts-ignore
  const pokemon = pokemonsJson[key];
  if(!color.includes(pokemon.color)) color.push(pokemon.color);
});

console.log(color)*/
/*import pokemonsJson from '../ressources/assets/oakdex-pokedex-master/data/pokemon.json';

const leveling_rate:string[] = [];

const pokemonKey = Object.keys(pokemonsJson);

pokemonKey.forEach(key => {
  //@ts-ignore
  const pokemon = pokemonsJson[key];
  if(!leveling_rate.includes(pokemon.leveling_rate)) leveling_rate.push(pokemon.leveling_rate);
});

console.log(leveling_rate)*/
/*const types:string[] = [];

const pokemonKey = Object.keys(pokemonsJson);

pokemonKey.forEach(key => {
  //@ts-ignore
  const pokemon = pokemonsJson[key];

  pokemon.types.forEach((type:string) => {
    if(!types.includes(type)) types.push(type)
  });
});

console.log('all type', types)
*/
/*
all type [
  'Grass',   'Ice',
  'Ground',  'Fighting',
  'Psychic', 'Electric',
  'Steel',   'Normal',
  'Flying',  'Fire',
  'Poison',  'Water',
  'Dragon',  'Bug',
  'Fairy',   'Dark',
  'Ghost',   'Rock'
]
*/
/**
import typeJson from '../ressources/assets/oakdex-pokedex-master/data/type.json';
const typeKey = Object.keys(typeJson);

const allType:string[][] = [];

typeKey.forEach((key, index) => {
  //@ts-ignore
  const type = typeJson[key]

  const typeSql = {
    id: index,
    names: type.names.en,
    normal: type.effectivness.Normal,
    fighting:  type.effectivness.Fighting,
    flying: type.effectivness.Flying,
    poison:  type.effectivness.Poison,
    ground: type.effectivness.Ground,
    rock:  type.effectivness.Rock,
    bug:  type.effectivness.Bug,
    ghost: type.effectivness.Ghost,
    steel:  type.effectivness.Steel,
    fire:  type.effectivness.Fire,
    water:  type.effectivness.Water,
    grass: type.effectivness.Grass,
    electric: type.effectivness.Electric,
    psychic: type.effectivness.Psychic,
    ice:  type.effectivness.Ice,
    dragon:  type.effectivness.Dragon,
    dark: type.effectivness.Dark,
    fairy: type.effectivness.Fairy
  };

  const keyTypeSql = Object.keys(typeSql);

  console.log(keyTypeSql.map(i => '`' + i + '`' + 'float NOT NULL'))

  const sqlInsert:string[] = [];
  keyTypeSql.forEach(keySql => {
    //@ts-ignore
    sqlInsert.push(typeSql[keySql])
  });

  allType.push(sqlInsert)
})

console.log('(' + allType.join(')\n('))

 (0,'Fighting',2,1,0.5,0.5,1,2,0.5,0,2,1,1,1,1,0.5,2,1,2,0.5)
(1,'Dragon',1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,2,1,0)
(2,'Ground',1,1,0,2,1,2,0.5,1,2,2,1,0.5,2,1,1,1,1,1)
(3,'Steel',1,1,1,1,1,2,1,1,0.5,0.5,0.5,1,0.5,1,2,1,1,2)
(4,'Grass',1,1,0.5,0.5,2,2,0.5,1,0.5,0.5,2,0.5,1,1,1,0.5,1,1)
(5,'Fire',1,1,1,1,1,0.5,2,1,2,0.5,0.5,2,1,1,2,0.5,1,1)
(6,'Bug',1,0.5,0.5,0.5,1,1,1,0.5,0.5,0.5,1,2,1,2,1,1,2,0.5)
(7,'Normal',1,1,1,1,1,0.5,1,0,0.5,1,1,1,1,1,1,1,1,1)
(8,'Rock',1,0.5,2,1,0.5,1,2,1,0.5,2,1,1,1,1,2,1,1,1)
(9,'Psychic',1,2,1,2,1,1,1,1,0.5,1,1,1,1,0.5,1,1,0,1)
(10,'Water',1,1,1,1,2,2,1,1,1,2,0.5,0.5,1,1,1,0.5,1,1)
(11,'Electric',1,1,2,1,0,1,1,1,1,1,2,0.5,0.5,1,1,0.5,1,1)
(12,'Ice',1,1,2,1,2,1,1,1,0.5,0.5,0.5,2,1,1,0.5,2,1,1)
(13,'Flying',1,2,1,1,1,0.5,2,1,0.5,1,1,2,0.5,1,1,1,1,1)
(14,'Ghost',0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,1)
(15,'Dark',1,0.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,0.5)
(16,'Poison',1,1,1,0.5,0.5,0.5,1,0.5,0,1,1,2,1,1,1,1,1,2)
(17,'Fairy',1,2,1,0.5,1,1,1,1,0.5,0.5,1,1,1,1,1,2,2,1
 */

/*import typeJson from '../ressources/assets/oakdex-pokedex-master/data/type/dragon.json';

const key = Object.keys(typeJson.effectivness);

console.log(key.map(i => i.toLowerCase() + ':'))*/


import { writeFile } from 'fs';
import movesJson from '../ressources/assets/oakdex-pokedex-master/data/move.json';
//import pokemonsJson from '../ressources/assets/oakdex-pokedex-master/data/pokemon.json';
//import itemsJson from '../items.json';

const moveKey = Object.keys(movesJson);
//const pokemonKey = Object.keys(pokemonsJson);
//const itemsKey = Object.keys(itemsJson);

//console.log('total moves :', moveKey.length)

/**
 * @table sql
 * 
 * id: index_number (int)
 * name: name.fr (varchar 12)
 * pp: pp (tinyint)
 * max_pp: max_pp (tinyint)
 * power: power (smallint)
 * accuracy: accuracy (smallint)
 * category: indexOf() (tinyint)
 * priority: priority (tinyint)
 * critical_hit: critical_hit (tinyint(1))
 * 
 * makes_contact: makes_contact (boolean)
 * affected_by_protect: affected_by_protect (boolean)
 * affected_by_magic_coat: affected_by_magic_coat (boolean)
 * affected_by_snatch: affected_by_snatch (boolean)
 * affected_by_mirror_move: affected_by_mirror_move (boolean)
 * affected_by_kings_rock: affected_by_kings_rock (boolean)
 */

const target = [ //tinyint(2)	
  "target_adjacent_single",
  "target_adjacent_user_single",
  "target_user_or_adjacent_user",
  "user",
  "all_users",
  "all_adjacent",
  "adjacent_foes_all",
  "all_except_user",
  "all_foes",
  "all",
  "user_and_random_adjacent_foe"
];

const category = ["physical", "status", "special", "varies"] //tinyint(1)

const listMoves:string[] = [];

const mapMove = new Map();
const mapItem = new Map();

moveKey.forEach(i => {

  //@ts-ignore
  const moveJson = movesJson[i];
  const move = {
    id: moveJson.index_number,
    name: (moveJson.names.fr || moveJson.names.en).replace(/'/gi, "\\'"),
    pp: moveJson.pp,
    max_pp: moveJson.max_pp,
    power: moveJson.power,
    accuracy: moveJson.accuracy,
    category: category.indexOf(moveJson.category),
    target: target.indexOf(moveJson.target),
    priority: moveJson.priority,
    critical_hit: moveJson.critical_hit,

    makes_contact: moveJson.makes_contact ? 1 : 0,
    affected_by_protect: moveJson.affected_by_protect ? 1 : 0,
    affected_by_magic_coat: moveJson.affected_by_magic_coat ? 1 : 0,
    affected_by_snatch: moveJson.affected_by_snatch ? 1 : 0,
    affected_by_mirror_move: moveJson.affected_by_mirror_move ? 1 : 0,
    affected_by_kings_rock: moveJson.affected_by_kings_rock ? 1 : 0,
  };

  //mapMove.set(moveJson.names.en, move);


  listMoves.push(`(${move.id},'${move.name}',${move.pp},${move.max_pp},${move.power},${move.accuracy},${move.category},${move.target},${move.priority},${move.critical_hit},${move.makes_contact},${move.affected_by_protect},${move.affected_by_magic_coat},${move.affected_by_snatch},${move.affected_by_mirror_move},${move.affected_by_kings_rock})`);
});

const finalInsert = 'INSERT INTO `moves`(`id`, `name`, `pp`, `max_pp`, `power`, `accuracy`, `category`, `target`, `priority`, `critical_hit`, `makes_contact`, `affected_by_protect`, `affected_by_magic_coat`, `affected_by_snatch`, `affected_by_mirror_move`, `affected_by_kings_rock`) VALUES' + listMoves.join(', ')

writeFile('sql/moves_sql.sql', finalInsert, 'utf8', function(err) {
  if (err) {
      console.log("Une erreur est survenue lors de l'écriture du fichier texte", err);
  } else {
      console.log("Fichier texte enregistré avec succès !");
  }
});
/*
const allMove:string[] = [];


itemsJson.items.forEach(i => mapItem.set(i.name, i.id))

pokemonKey.forEach(key => {
  //@ts-ignore
  const pokemonJson = pokemonsJson[key];

  let plusGrandArray = pokemonJson.move_learnsets[0].learnset; 
  let plusGrandeLongueur = pokemonJson.move_learnsets[0].learnset.length; // Longueur du premier sous-tableau

  //@ts-ignore
  pokemonJson.move_learnsets.forEach(subArray => {
    if (subArray.learnset.length > plusGrandeLongueur) {
      plusGrandeLongueur = subArray.learnset.length; 
      plusGrandArray = subArray.learnset; 
    }
  });

  //@ts-ignore
  plusGrandArray.forEach(i => {
    const move = mapMove.get(i.move);
    if(move) {
      const isTm = mapItem.get(i.tm);
      allMove.push(`(${pokemonJson.national_id},${move.id},${i.level || 'null'},${isTm || 'null'},${i.egg_move || 'null'})`)
    }
  })
})

const finalInsert = 'INSERT INTO `pokemons_moves`(`id`, `id_pokemon`, `id_move`, `level`, `tm`, `egg_move`) VALUES ' + allMove.join(', ');

writeFile('moves_pokemon_sql.txt', finalInsert, 'utf8', function(err) {
  if (err) {
      console.log("Une erreur est survenue lors de l'écriture du fichier texte", err);
  } else {
      console.log("Fichier texte enregistré avec succès !");
  }
});*/