import { MysqlPokemonGang, cacheServer } from "../../../lib";
import { Router } from 'express';
import path from 'path';
const router = Router();


// Définition des types pour les IVs et les EVs
interface IVs {
  hp: number;
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  speed: number;
}

interface EVs {
  hp: number;
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  speed: number;
};

interface MysqlPokemons {
  // ... autres propriétés
  experience_curve: 'fast' | 'medium_fast' | 'medium_slow' | 'slow';
  level: number;
  // ...
}

// La fonction de génération de Pokémon
function generateRandomPokemon() {
  // Génération aléatoire des IVs
  const ivs: IVs = {
    hp: Math.floor(Math.random() * 32),
    atk: Math.floor(Math.random() * 32),
    def: Math.floor(Math.random() * 32),
    spAtk: Math.floor(Math.random() * 32),
    spDef: Math.floor(Math.random() * 32),
    speed: Math.floor(Math.random() * 32)
  };

  // Attribution aléatoire des EVs (total maximum de 510)
  const evs: EVs = { hp: 0, atk: 0, def: 0, spAtk: 0, spDef: 0, speed: 0 };
  let totalEVs = 510;
  while (totalEVs > 0) {
    const stat = ['hp', 'atk', 'def', 'spAtk', 'spDef', 'speed'][Math.floor(Math.random() * 6)] as keyof EVs;
    const increase = Math.min(Math.floor(Math.random() * (totalEVs + 1)), 255 - evs[stat]);
    evs[stat] += increase;
    totalEVs -= increase;
  }

  return {
    ivs,
    evs
    // Ajoutez ici d'autres modifications si nécessaire, comme la nature, etc.
  };
};

function generateRandomIVs(): IVs {
  return {
    hp: Math.floor(Math.random() * 32),
    atk: Math.floor(Math.random() * 32),
    def: Math.floor(Math.random() * 32),
    spAtk: Math.floor(Math.random() * 32),
    spDef: Math.floor(Math.random() * 32),
    speed: Math.floor(Math.random() * 32)
  };
}

function generateRandomEVs() {
  const evs: EVs = { hp: 0, atk: 0, def: 0, spAtk: 0, spDef: 0, speed: 0 };
  let totalEVs = 510;
  while (totalEVs > 0) {
    const stat = ['hp', 'atk', 'def', 'spAtk', 'spDef', 'speed'][Math.floor(Math.random() * 6)] as keyof EVs;
    const increase = Math.min(Math.floor(Math.random() * (totalEVs + 1)), 255 - evs[stat]);
    evs[stat] += increase;
    totalEVs -= increase;
  };

  return evs
}

function determineGender(gender:number): 'Male' | 'Female' | 'Genderless' {
  if (gender === -1) return 'Genderless';
  return Math.random() * 100 < gender ? 'Male' : 'Female';
}

function calculateExperience(level: number): number {
  // Utilisez la formule de courbe d'expérience "medium"
  return Math.pow(level, 3);
}

function calculateHP(baseStatsHP: number, ivsHP: number, evsHP: number, level: number): number {
  return Math.floor(((2 * baseStatsHP + ivsHP + Math.sqrt(evsHP) / 4) * level) / 100) + level + 10;
}

function generatePokemon(pokemonData: MysqlPokemonGang<'pokemons'>[0], level: number) {
  const ivs = generateRandomIVs();
  const evs = generateRandomEVs();
  const gender = determineGender(pokemonData.gender);
  const xp = calculateExperience(level);
  const hp = calculateHP(pokemonData.base_stats_hp, ivs.hp, evs.hp, level);

  return {
    gender,
    ivs,
    evs,
    xp,
    hp
  };
}



router.get('/', async (req, res) => { 
  const idPokemon = +req.query.id! || 1;
  
  // sql: `INSERT INTO  users_pokemons (id_user, id_pokemon, hp, xp, iv_hp, iv_atk, iv_def, iv_sp_atk, iv_sp_def, iv_speed, ev_yield_hp, ev_yield_atk, ev_yield_def, ev_yield_sp_atk, ev_yield_sp_def, ev_yield_speed) VALUES (1,${pokemon.id},${createdPokemon.hp},${createdPokemon.xp},${createdPokemon.ivs.hp},${createdPokemon.ivs.atk},${createdPokemon.ivs.def},${createdPokemon.ivs.spAtk},${createdPokemon.ivs.spDef},${createdPokemon.ivs.speed},${createdPokemon.evs.hp},${createdPokemon.evs.atk},${createdPokemon.evs.def},${createdPokemon.evs.spAtk},${createdPokemon.evs.spDef},${createdPokemon.evs.speed})`

  const pokemon = cacheServer.pokemon.pokemons.get(idPokemon)!;
  const createdPokemon = generatePokemon(pokemon, 5);
  res.json({
    pokemon: pokemon,
    wildPokemon: createdPokemon
  });
});

export default router;

function calculateInitialExperience(pokemon: MysqlPokemons) {
  switch (pokemon.experience_curve) {
    case 'fast':
      return Math.floor(4 * Math.pow(pokemon.level, 3) / 5);
    case 'medium_fast':
      return Math.pow(pokemon.level, 3);
    case 'medium_slow':
      return Math.floor(6/5 * Math.pow(pokemon.level, 3) - 15 * Math.pow(pokemon.level, 2) + 100 * pokemon.level - 140);
    case 'slow':
      return Math.floor(5 * Math.pow(pokemon.level, 3) / 4);
    default:
      return 0;
  }
} 