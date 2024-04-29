import { client } from '../index.js';

class CreateWorld {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
  };

  async spawnItems() {
    const response = await fetch('/api/game/world/spawn-items');
    const data = await response.json();
    return data.items
  };

  async getZones() {
    const response = await fetch(`/api/game/pokemon/zones?id=${client.currentIndexWorld}`);
    const data = await response.json();
    return data;
  }

  create() {
    return new Promise(async (resolve, reject) => {
      /*await fetch('/api/game/world/spawn-items')
      .then(response => response.json())
      .then(data => client.world.currentItemsWorld = data.items);
      await fetch(`/api/game/pokemon/zones?id=${client.currentIndexWorld}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        client.world.zones = data
      });
      */

      client.world.currentItemsWorld = await this.spawnItems()
      //client.world.zones = await this.getZones(); 
      client.world.currentWorld = {};

      const worldData = client.world.worlds.get(client.currentIndexWorld);

      const x = 0
      const y = 0

      client.world.currentItemsWorld.filter(i => i.world === client.currentIndexWorld).forEach(i => {
        const item = this.scene.add.sprite(i.x * client.settings.world.sizePixelTile, i.y * client.settings.world.sizePixelTile,'tiled_map_4_32', 'pokeball').setOrigin(0, 0);
        item.idItemMap = i.id;
        this.scene.layer.items.add(item);
      });

      const map = this.scene.make.tilemap({key: worldData.name});
      const tileset = map.addTilesetImage('tiled_map_4_32', 'tiled_map_4_32');

      const bottomLayer = map.createLayer('bottom', tileset, x, y);
      const middle1Layer = map.createLayer('middle1', tileset, x, y);
      const middle2Layer = map.createLayer('middle2', tileset, x, y);
      const topLayer1 = map.createLayer('top1', tileset, x, y);
      const topLayer2 = map.createLayer('top2', tileset, x, y);
      const collisionLayer = map.createLayer('collision', tileset, x, y);

      const checkBoxcalqueCollision = document.getElementById('checkbox-calque-collision');
      collisionLayer.setVisible(checkBoxcalqueCollision.checked);

      this.scene.layer.background.add(bottomLayer);
      this.scene.layer.background.add(middle1Layer);
      this.scene.layer.background.add(middle2Layer);
      this.scene.layer.top.add(topLayer1);
      this.scene.layer.top.add(topLayer2);
      this.scene.layer.top.add(collisionLayer);

      client.world.currentWorld = {
        worldData,
        map,
        tileset,
        bottomLayer,
        middle1Layer,
        middle2Layer,
        topLayer1,
        topLayer2,
        collisionLayer,
      };
      resolve();
    })
  };
};

export { CreateWorld };

/*
 "frames": [
       {
              "filename": "pokeball",
              "frame": {"x":128,"y":640,"w":32,"h":32},
              "rotated": false,
              "trimmed": false,
              "spriteSourceSize": {"x":0,"y":0,"w":32,"h":32},
              "sourceSize": {"w":32,"h":32},
              "pivot": {"x":0,"y":0}
       }
 ]
 "frame pokeball"
*/