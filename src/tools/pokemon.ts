import pokemonsJson from '../../ressources/assets/oakdex-pokedex-master/data/pokemon.json';

export class PokemonTool {
  mapPokemon = new Map<string,{id:number;name:string}>();

  constructor() {

  };

  get() {
    const pokemonKey = Object.keys(pokemonsJson) as (keyof typeof pokemonsJson)[];

    pokemonKey.forEach(value => {
      const pokemonJson = pokemonsJson[value] as any;

      const pokemon = {
        id: pokemonJson.national_id,
        name: pokemonJson.names.en.toLowerCase().replace(/ /gi, '-')
      };

      this.mapPokemon.set(pokemon.name, pokemon);
    });
  };
};