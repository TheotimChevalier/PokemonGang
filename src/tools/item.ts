import itemsJson from '../../ressources/assets/oakdex-pokedex-master/data/item.json';
import itemsJsonSql from './json/items.json';

export class ItemTool {
  mapItem = new Map<string, {}>();

  constructor() {};

  get() {
    const itemKey = Object.keys(itemsJson) as (keyof typeof itemsJson)[];

    itemKey.forEach((value, index) => {
      const itemJson = itemsJson[value];

      const item = {
        name:itemJson.names.en,
        buying:itemJson.prices[0].buying,
        selling:itemJson.prices[0].selling,
        fling_power:itemJson.fling_power
      }
    })
  }
}