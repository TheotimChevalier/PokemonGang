import { client } from './utils/index.js';

import StartScene from './scenes/start.js';
import WorldScene from './scenes/world.js';
import HUDScene from './scenes/hud.js';
import InventoryScene from './scenes/inventory.js';
import WildFightScene from './scenes/wildFight.js';

new Phaser.Game({
  type: Phaser.AUTO,
  width: client.settings.game.width,
  height: client.settings.game.height,
  scene: [StartScene, WorldScene, HUDScene, InventoryScene, WildFightScene],
  pixelArt:true,
  render: {
    pixelArt:true,
    antialias:false,
    antialiasGL:false,

    roundPixels: true
  },
  fps: {
    target: 60,
    forceSetTimeOut: false
  }
});