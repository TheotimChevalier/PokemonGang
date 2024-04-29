import { client, SocketEvent } from '../index.js';

class Multiplayer {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
    this.socketEvent = new SocketEvent();
    this.socket = client.multiplayer.socket;
    this.otherPlayers = client.multiplayer.otherPlayers;
    this.sizePixelTile = client.settings.world.sizePixelTile;
  };

  world() {
    //console.log('multiplayerWorld');

    this.otherPlayers.forEach(player => {
      player.player.destroy();
      player.username.destroy();
    });
    this.otherPlayers.clear();

    this.socket.on(this.socketEvent.On.DeleteSelf, () => {
      this.scene.scene.start(client.scenes.key.stop)
    });

    this.socket.emit(this.socketEvent.Emit.InitPlayer, {});
    this.emit(this.socketEvent.Emit.PlayerMove);

    this.socket.on(this.socketEvent.On.InitPlayerRequest, () => this.emit(this.socketEvent.Emit.PlayerMove));

    this.socket.on(this.socketEvent.On.PlayerMoved, async (data) => {
      const otherPlayer = this.otherPlayers.get(data.id);

      if(otherPlayer && (data.scene != this.scene.scene.key || data.world != client.currentIndexWorld)) {
        otherPlayer.player.destroy();
        otherPlayer.username.destroy();
        this.otherPlayers.delete(data.id);
      };

      if(otherPlayer) {
        if(!otherPlayer.player.active) {
          console.log('delete exite player');
          otherPlayer.player.destroy();
          otherPlayer.username.destroy();
          this.otherPlayers.delete(data.id);
          if(data.scene === this.scene.scene.key && data.world === client.currentIndexWorld) this.createOtherPlayer(data);
        } else {
          if(otherPlayer.skin != data.skin) await this.scene.loadSprite.player(data.skin);
          otherPlayer.x = data.x;
          otherPlayer.y = data.y;
          otherPlayer.skin = data.skin;
          otherPlayer.scene = data.scene;
          otherPlayer.world = data.world;
          otherPlayer.rotation = data.rotation;
          if(otherPlayer.player.scale != data.scale) otherPlayer.player.setScale(data.scale);

          if(data.teleport) {
            otherPlayer.player.x = otherPlayer.x * this.sizePixelTile - client.settings.player.xCorrection;
            otherPlayer.player.y = otherPlayer.y * this.sizePixelTile - client.settings.player.yCorrection;

            otherPlayer.username.x = otherPlayer.x * this.sizePixelTile;
            otherPlayer.username.y = otherPlayer.y * this.sizePixelTile - client.multiplayer.config.usernameY;

            data.animation = client.animation.player.idles[data.rotation];
          } else {
            this.scene.tweens.add({
              targets: otherPlayer.player,
              x: otherPlayer.x * this.sizePixelTile - client.settings.player.xCorrection,
              y: otherPlayer.y * this.sizePixelTile - client.settings.player.yCorrection,
              duration: this.scene.updateInterval,
              ease: 'Linear'
            });
            this.scene.tweens.add({
              targets: otherPlayer.username,
              x: otherPlayer.x * this.sizePixelTile,
              y: otherPlayer.y * this.sizePixelTile - client.multiplayer.config.usernameY,
              duration: this.scene.updateInterval,
              ease: 'Linear'
            });
          };
        };
      } else if(data.scene === this.scene.scene.key && data.world === client.currentIndexWorld) {
        this.createOtherPlayer(data);
      };
    });


    this.socket.on(this.socketEvent.On.PlayerDisconnected, (data) => {
      const otherPlayer = this.otherPlayers.get(data.id);
      if(otherPlayer) {
        otherPlayer.player.destroy();
        otherPlayer.username.destroy();
        this.otherPlayers.delete(data.id);
      };
    });

    this.socket.on(this.socketEvent.On.UpdatePlayerAnimationPlayer, async (data) => {
      const otherPlayer = this.otherPlayers.get(data.id);
      if(otherPlayer) {
        if(otherPlayer.skin != data.skin) await this.scene.loadSprite.player(data.skin);
        otherPlayer.player.play(data.animation);
      }
    });

  };

  async createOtherPlayer(data) {
    console.log('create new player')

    await this.scene.loadSprite.player(data.skin);
    const otherPlayer = {
      player: this.scene.add.sprite(data.x * this.sizePixelTile - client.settings.player.xCorrection, data.y * this.sizePixelTile - client.settings.player.yCorrection, 'player')
      .setScale(data.scale)
      .setOrigin(0, 0),
      x: data.x,
      y: data.y,
      rotation: data.rotation,
      skin:data.skin,
      scene:data.scene,
      world:data.world,
      username: this.scene.add.text(data.x * this.sizePixelTile, data.y * this.sizePixelTile - client.multiplayer.config.usernameY, data.username, {
        fontFamily: 'W95FA',
        fontSize:11,
        color: '#ffffff',
        stroke: '#ff0000',
        strokeThickness: 5
        }).setOrigin(0, 0)
    };

    this.otherPlayers.set(data.id, otherPlayer);
    otherPlayer.player.play(`player_${data.skin}_` + client.animation.player.idles[data.rotation]);

    this.scene.layer.otherPlayers.add(otherPlayer.player);
    //this.scene.layer.player.sendToBack(otherPlayer.player);
    this.scene.layer.text.add(otherPlayer.username);
  };

  emit(name,teleport=false) {
    switch(name) {
      case this.socketEvent.Emit.PlayerMove:
        this.socket.emit(this.socketEvent.Emit.PlayerMove, {
          x: client.x,
          y: client.y,
          rotation: client.player.rotation,
          teleport,
          scale: client.player.player.scaleX,
          skin:client.player.skin,
          world:client.currentIndexWorld,
          scene:this.scene.scene.key
        });
      break;
      case this.socketEvent.Emit.SaveLastPosition:
        this.socket.emit(this.socketEvent.Emit.SaveLastPosition, {
          x: client.x,
          y: client.y,
          rotation: client.player.rotation,
          skin: client.player.skin,
          world: client.currentIndexWorld,
          scene: this.scene.scene.key
        });
      break;
      case this.socketEvent.Emit.UpdatePlayerAnimation:
        this.socket.emit(this.socketEvent.Emit.UpdatePlayerAnimation, {
          animation: client.animation.player.last,
          skin: client.player.skin,
          world: client.currentIndexWorld,
          scene: this.scene.scene.key
        });
      break;  
    };
  };
};

export { Multiplayer };