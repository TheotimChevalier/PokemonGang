import { client } from '../index.js'

/**
 * Représente les différentes couches dans une scène de Phaser.
 */
class CreateLayer {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
  };

  world() {
    this.scene.layer = {
      background: this.scene.add.layer(),
      items: this.scene.add.container(0, 0),
      otherPlayers: this.scene.add.container(0, 0),
      player: this.scene.add.container(client.x * client.settings.world.sizePixelTile, client.y * client.settings.world.sizePixelTile), //client.x * client.settings.world.sizePixelTile, client.y * client.settings.world.sizePixelTile
      top: this.scene.add.layer(),
      text: this.scene.add.container(0, 0),
    };
  };

  inventory() {
    this.scene.layer = {
      background: this.scene.add.container(0, 0),
      items: this.scene.add.container(0, this.scene.itemPosition.index * 37),
      top: this.scene.add.container(0, 0),
      navBarBlip: this.scene.add.container(0, 0),
      pokedollar: this.scene.add.container(0, 0)
    };
  };

  wildFight() {
    this.scene.layer = {
      background: this.scene.add.container(0, 0),
      pokemon: this.scene.add.container(0, 0),
      top: this.scene.add.container(0, 0),
    }
  }
};

export { CreateLayer };