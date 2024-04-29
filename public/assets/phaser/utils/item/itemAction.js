import { client } from '../index.js';

class ItemAction {
  /** 
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
  };

  catchInWorld() {
    this.scene.input.keyboard.on('keyup-SPACE', event => {
      if(client.player.freeze) return;
      const frontPlayer = [
        {x:0,y:-1},
        {x:0,y:1},
        {x:1,y:0},
        {x:-1,y:0},
      ];

      const coordFrontPlayer = frontPlayer[client.player.rotation];
      const x = coordFrontPlayer.x + client.x;
      const y = coordFrontPlayer.y + client.y;
      const itemFrontPlayer = client.world.currentItemsWorld.find(i => i.x === x && i.y === y);
      if(itemFrontPlayer) {

        const itemSprite = this.scene.layer.items.list.find(i => i.idItemMap === itemFrontPlayer.id);
        if(itemSprite) itemSprite.destroy();
        fetch('/api/game/world/catch-item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: itemFrontPlayer.id,value:itemFrontPlayer.value,idItem:itemFrontPlayer.id_item})
        });

        client.world.currentItemsWorld = client.world.currentItemsWorld.filter(i => i.id != itemFrontPlayer.id);
        this.scene.scene.get(client.scenes.key.hud).popUpCatchItem(itemFrontPlayer)
      };
    });
  };
};

export { ItemAction };