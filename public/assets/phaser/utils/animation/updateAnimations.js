import { SocketEvent, client } from "../index.js";

class UpdateAnimation {
  /** 
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
    this.socketEvent = new SocketEvent(this);
  };

  player(name) {
    name = `player_${client.player.skin}_` + name
    if(client.animation.player.last != name) {
      client.animation.player.last = name;
      client.player.player.play(name);
      document.getElementById('anim-player').innerText = name;
      this.scene.multiplayer.emit(this.socketEvent.Emit.UpdatePlayerAnimation);
    };
  };
};

export { UpdateAnimation };