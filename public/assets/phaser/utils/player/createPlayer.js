import { client } from '../index.js';

class CreatePlayer {
  /**
   * 
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
  };

  async create() {
    this.scene.loadSprite.player(client.player.skin);

    const player = this.scene.add.sprite(-client.settings.player.xCorrection, -client.settings.player.yCorrection, `player_0`)
    .setOrigin(0, 0)
    .setScale(client.settings.player.scale);  
  
    client.player.player = player;
  
    client.player.defaultPosition.x = player.x;
    client.player.defaultPosition.y = player.y;
    client.player.y = 0;
  
    const animationName = `player_${client.player.skin}_` + client.animation.player.first;
    client.animation.player.last = animationName;
  
    player.play(animationName);
    this.scene.layer.player.add(player);
  };
};

export { CreatePlayer };