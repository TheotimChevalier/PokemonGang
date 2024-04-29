import { SocketEvent, cacheClient, client, synchroCache } from "../index.js";

class UpdateHTML {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
    this.socketEvent = new SocketEvent();

    this.labelPosition = document.getElementById('position-player');
    this.labelWorld = document.getElementById('world-name');
    this.checkBoxCollision = document.getElementById('checkbox-collision');
    this.rangeSliderScale = document.getElementById('rangeSlider-scale');
    this.changeSkinButton = document.getElementById('player-change-skin');

      //Calque map
    this.checkBoxcalqueCollision = document.getElementById('checkbox-calque-collision');
    this.checkBoxcalqueTop2 = document.getElementById('checkbox-calque-top2');
    this.checkBoxcalqueTop1 = document.getElementById('checkbox-calque-top1');
    this.checkBoxcalqueMiddle2 = document.getElementById('checkbox-calque-middle2');
    this.checkBoxcalqueMiddle1 = document.getElementById('checkbox-calque-middle1');
    this.checkBoxcalqueBottom = document.getElementById('checkbox-calque-bottom');

    //server
    this.synchroServerButton = document.getElementById('synchro-server');
    this.synchroClientButton = document.getElementById('synchro-client');
  };

  update() {
    this.labelPosition.innerText = `x:${client.x}, y:${client.y}, r:${client.player.rotation}`;
    this.labelWorld.innerText = `[${client.currentIndexWorld}] ${client.world.currentWorld.worldData.name}`;
  };

  event() {
    this.checkBoxCollision.addEventListener('change', () => client.settings.player.collision = this.checkBoxCollision.checked);

    this.rangeSliderScale.addEventListener('change', () => {
      client.player.player.setScale(this.rangeSliderScale.value);
      this.scene.multiplayer.emit(this.socketEvent.Emit.PlayerMove)
      document.getElementById('rangeSlider-scale-label').innerHTML = `Scale: x${this.rangeSliderScale.value}`;
    });

    this.changeSkinButton.addEventListener('click', async () => {
      
      console.log('change skin')
      //client.player.skin = client.player.skin ? 0 : 1;
      const newSkin = (client.player.skin + 1) % client.settings.player.skins;
      await this.scene.loadSprite.player(newSkin);
      client.player.skin = newSkin;
      this.scene.multiplayer.emit(this.socketEvent.Emit.SaveLastPosition)
    });

    this.checkBoxcalqueCollision.addEventListener('change', () => client.world.currentWorld.collisionLayer.setVisible(this.checkBoxcalqueCollision.checked));

    this.checkBoxcalqueTop2.addEventListener('change', () => client.world.currentWorld.topLayer2.setVisible(this.checkBoxcalqueTop2.checked));
  
    this.checkBoxcalqueTop1.addEventListener('change', () => client.world.currentWorld.topLayer1.setVisible(this.checkBoxcalqueTop1.checked));
  
    this.checkBoxcalqueMiddle2.addEventListener('change', () => client.world.currentWorld.middle2Layer.setVisible(this.checkBoxcalqueMiddle2.checked));
  
    this.checkBoxcalqueMiddle1.addEventListener('change', () => client.world.currentWorld.middle1Layer.setVisible(this.checkBoxcalqueMiddle1.checked));
  
    this.checkBoxcalqueBottom.addEventListener('change', () => client.world.currentWorld.bottomLayer.setVisible(this.checkBoxcalqueBottom.checked));

    this.synchroServerButton.addEventListener('click', async () => {
      fetch('/api/server/synchro')
    });

    this.synchroServerButton.addEventListener('click', async () => {
      synchroCache()
    });
  };
};

export { UpdateHTML };