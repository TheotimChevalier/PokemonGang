import { cacheClient, client } from "../index.js";

class CreateKeyboard {
   /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
  };

  world() {
    this.clear();

    client.keys.keys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.Z,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.Q,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      e: Phaser.Input.Keyboard.KeyCodes.E,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,

      c: Phaser.Input.Keyboard.KeyCodes.C,

      p: Phaser.Input.Keyboard.KeyCodes.P,
      m: Phaser.Input.Keyboard.KeyCodes.M,

      i: Phaser.Input.Keyboard.KeyCodes.I,

      n: Phaser.Input.Keyboard.KeyCodes.N,
      b: Phaser.Input.Keyboard.KeyCodes.B,
    });

    this.scene.input.keyboard.on('keydown-SHIFT', event => {
      this.scene.updateInterval = client.settings.speed.run;
    });
    this.scene.input.keyboard.on('keyup-SHIFT', event => {
      this.scene.updateInterval = client.settings.speed.walk;
    });

    this.scene.input.keyboard.on('keydown-P', event => {
      if(client.player.freeze) return;
      client.currentIndexWorld = Math.min(client.currentIndexWorld + 1, client.world.worlds.size - 1);
      this.scene.scene.restart();
    })

    this.scene.input.keyboard.on('keydown-M', event => {
      if(client.player.freeze) return;
      client.currentIndexWorld = Math.max(client.currentIndexWorld - 1, 0);
      this.scene.scene.restart();
    });

    this.scene.input.keyboard.on('keydown-C', event => {
      const checkBoxCollision = document.getElementById('checkbox-collision');
      checkBoxCollision.checked = !checkBoxCollision.checked;
      client.settings.player.collision = checkBoxCollision.checked
    });

    this.scene.input.keyboard.on('keyup-N', event => {
      console.log(cacheClient)
      /*this.scene.tweens.add({
        targets: client.player.player,
        y: client.player.player.y - 32,
        ease: 'Lineare',
        duration: this.scene.updateInterval,
      })*/
    })
    this.scene.input.keyboard.on('keyup-B', event => {
      /*this.scene.tweens.add({
        targets: client.player.player,
        y: client.player.player.y + 32,
        ease: 'Lineare',
        duration: this.scene.updateInterval,
      })*/
    })

    setTimeout(() => {
      this.scene.input.keyboard.on('keydown-E', event => { //world → inventory
        //this.scene.scene.start(client.scenes.key.inventory)
        this.scene.scene.get(client.scenes.key.inventory).showHUD()
      });
    }, client.settings.timeout.menuSwitch);
  };

  /*inventory() {
    this.clear();

    client.keys.keys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.Z,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.Q,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      
      esc: Phaser.Input.Keyboard.KeyCodes.ESC,
      i: Phaser.Input.Keyboard.KeyCodes.I
    });

    setTimeout(() => {
      this.scene.input.keyboard.on('keydown-E', event => { //inventory → world
        this.scene.scene.start(client.scenes.key.world)
      });
    }, client.settings.timeout.menuSwitch);
  };*/

  wildFight() {
    this.clear();

    client.keys.keys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.Z,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.Q,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      e: Phaser.Input.Keyboard.KeyCodes.E,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,

      c: Phaser.Input.Keyboard.KeyCodes.C,

      p: Phaser.Input.Keyboard.KeyCodes.P,
      m: Phaser.Input.Keyboard.KeyCodes.M,

      i: Phaser.Input.Keyboard.KeyCodes.I,

      n: Phaser.Input.Keyboard.KeyCodes.N,
      b: Phaser.Input.Keyboard.KeyCodes.B,
    });

    setTimeout(() => {
      this.scene.input.keyboard.on('keydown-E', event => { //wildfight → world
        this.scene.scene.start(client.scenes.key.world)
      });
    }, client.settings.timeout.menuSwitch);
  }

  clear() {
    this.scene.input.keyboard.removeAllKeys();
  };
}


export { CreateKeyboard };