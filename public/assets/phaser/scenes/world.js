import { CreateWorld, client, CreateLayer, CreatePlayer, PlayerMove, CreateKeyboard, UpdateAnimation, UpdateHTML, Multiplayer, ItemAction, LoadSprite, CreateAnimations } from "../utils/index.js";

class WorldScene extends Phaser.Scene {
  constructor() {
    super({key: client.scenes.key.world});

    this.layer = {};
    this.lastUpdateTime = 0;
    this.updateInterval = client.settings.speed.walk;

    this.createLayer = new CreateLayer(this);
    this.createWorld = new CreateWorld(this);
    this.createplayer = new CreatePlayer(this);
    this.createKeyboard = new CreateKeyboard(this);
    this.playerMove = new PlayerMove(this);
    this.updateAnimation = new UpdateAnimation(this);
    this.updateHTML = new UpdateHTML(this);
    this.multiplayer = new Multiplayer(this);
    this.itemAction = new ItemAction(this);
    this.loadSprite = new LoadSprite(this);
    this.createAnimations = new CreateAnimations(this);

    this.updateHTML.event();
  };

  async preload() {
    console.log(this.scene.key);
    client.scenes.currentKey = this.scene.key;
    this.createKeyboard.world();
    client.player.freeze = false;
  };

  async create() {
    this.createLayer.world();
    this.createWorld.create();
    this.createplayer.create();
    this.multiplayer.world();
    this.itemAction.catchInWorld();

    const camera = this.cameras.main;
    camera.startFollow(this.layer.player, true);
  };

  update(time, delta) {
    if(!client.player.freeze && time - this.lastUpdateTime >= this.updateInterval) this.playerMove.move(time);
  };
};

export default WorldScene