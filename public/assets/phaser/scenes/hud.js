import { client } from "../utils/index.js";

class HUDScene extends Phaser.Scene {
  constructor() {
    super({key: client.scenes.key.hud, active:true});

    this.popUpZone = false;
  };

  preload() {
    console.log(this.scene.key);
  };

  create() {
    
  };

  popUpCatchItem(itemFrontPlayer) {
    const containerPopUp = this.add.container(this.game.config.width, 10); 

    const itemSpritePopUp = this.add.sprite(0, 0, 'items_spritesheet', itemFrontPlayer.spritesheet).setOrigin(0, 0.5)
    const textPopUp = this.add.text(31, 0, `x${itemFrontPlayer.value}`, {
      fontFamily: 'W95FA',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 5
    }).setOrigin(0, 0.5);

    containerPopUp.add([itemSpritePopUp, textPopUp]);

    this.tweens.add({
      targets: containerPopUp,
      x: this.game.config.width - 60,
      duration: 100, 
      ease: 'Linear',
      hold: 2000,
      yoyo:true,
      onComplete: () => {
        containerPopUp.destroy();
      },
    });
  };

  popUpZoneName(name) {
    if(!this.popUpZone) {
      this.popUpZone = true;
      const containerPopUp = this.add.container(this.game.config.width, 0);

      const rectangle = this.add.rectangle(-5, 5, 100, 30, 0xffffff).setOrigin(1,1);
      const textZone = this.add.text(-100, -10, client.world.currentWorld.worldData.name + '\n' + name,{
        fontFamily: 'W95FA',
        color: '#000000',
        fontSize: 12,
      }).setOrigin(0,0.5);
  
      containerPopUp.add([rectangle, textZone]);
  
      this.tweens.add({
        targets: containerPopUp,
        y: 30,
        duration:100,
        ease: 'Linear',
        hold: 2000,
        yoyo:true,
        onComplete: () => {
          containerPopUp.destroy();
          this.popUpZone = false;
        }
      });
    };
  };
};

export default HUDScene