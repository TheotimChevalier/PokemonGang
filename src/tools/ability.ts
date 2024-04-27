import abilitysJson from '../../ressources/assets/oakdex-pokedex-master/data/ability.json';


export class AbilityTool {
  mapAbility = new Map<number,{id:number,name:string,description:string}>();

  constructor() {

  };

  get() {
    const abilityKey = Object.keys(abilitysJson) as (keyof typeof abilitysJson)[];

    abilityKey.forEach(value => {
      const abilityJson = abilitysJson[value];
      
      const ability = {
        id: abilityJson.index_number,
        //@ts-ignore
        name: abilityJson.names.fr || abilityJson.names.en,
        description: abilityJson.descriptions.en
      };

      this.mapAbility.set(ability.id, ability);
    });
  };

  exportSql() {
    return 'INSERT INTO `abilitys`(`id`, `name`, `description`) VALUES ' + [...this.mapAbility.values()].map(i => `(${i.id},'${i.name}',${i.description})`).join(', ');
  }
};