import { client } from '../index.js';

class CreateAnimations {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
  };

  /**
   * @deprecated retirer
   * @param {string} label 
   * @param {string} key 
   * @param {number} frameRate 
   * @param {number} start 
   * @param {number} end 
   * @param {number | undefined} repeat 
   */
  player(label, key, frameRate, start, end, repeat=-1) {

    /*client.settings.player.skins.forEach(id => {
      const labelSkin = label + id;
      const keySkin = labelSkin + '_' + key;
      this.scene.anims.create({
        key: keySkin,
        frameRate,
        frames: this.scene.anims.generateFrameNumbers(labelSkin, {start, end}),
        repeat
      });
    })*/
  };

  /**
   * 
   * @param {string} label 
   * @param {string} key 
   * @param {number} frameRate 
   * @param {number} start 
   * @param {number} end 
   * @param {number | undefined} repeat 
   */
  playerSprite(label, key, frameRate, start, end, repeat=-1) {
    const keySkin = label + '_' + key;
    this.scene.anims.create({
      key: keySkin,
      frameRate,
      frames: this.scene.anims.generateFrameNumbers(label, {start, end}),
      repeat
    });
  };
};

export { CreateAnimations }