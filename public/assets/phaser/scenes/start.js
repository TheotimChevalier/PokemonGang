import { client, PlayerMove, CreateAnimations, UpdateHTML, LoadSprite, synchroCache } from "../utils/index.js";

class StartScene extends Phaser.Scene {
  constructor() {
    super({key: client.scenes.key.start});

    this.playerMove = new PlayerMove(this);
    this.createAnimations = new CreateAnimations(this);
    this.updateHTML = new UpdateHTML(this);
    this.loadSprite = new LoadSprite(this);
  };

  async preload() {
    console.log(this.scene.key);
    client.scenes.currentKey = this.scene.key;

    //world
    this.load.atlas('tiled_map_4_32', '../../assets/level/tileset/tiled_map_4_32.png', '../../assets/level/tileset/tiled_map_4_32.json');

    //player
    /*client.settings.player.skins.forEach(id => {
      this.load.spritesheet(`player${id}`, `../../assets/img/player/player${id}_x32.png`, {frameWidth:client.settings.player.width, frameHeight:client.settings.player.height});
    });*/

    //world
    client.world.worlds.forEach(value => this.load.tilemapTiledJSON(value.name, value.path));

    //inventory
    this.load.spritesheet('items_spritesheet', '../../assets/img/items/items_spritesheet.png', {frameWidth:30, frameHeight:30});
    this.load.spritesheet('hud_items_menu', '../../assets/img/items/hud_items_menu.png', {frameWidth:this.game.config.width, frameHeight:this.game.config.height});
    this.load.spritesheet('hud_nav_bar_blip', '../../assets/img/items/hud_nav_bar_blip.png', {frameWidth:20, frameHeight:20});

    this.load.spritesheet('hud_fight_0', '../../assets/img/fight/hud_fight_0.png', {frameWidth:this.game.config.width, frameHeight:this.game.config.height});

    //particle
    this.load.image('particle_shiny', '../../assets/img/particle/shiny.png')

    await fetch('/api/player/get-player')
    .then(response => response.json())
    .then(data => {
      client.x = data.x;
      client.y = data.y;
      client.player.rotation = data.rotation;
      client.player.skin = data.skin;
      client.currentIndexWorld = data.world;
    });

    synchroCache();
  };

  create() {
    client.world.tiles = this.textures.get('tiled_map_4_32').customData.tiles;
    this.loadSprite.player(client.player.skin)

    /*this.createAnimations.player('player', 'idle_down', 1, 56, 56);
    this.createAnimations.player('player', 'idle_left', 1, 68, 68);
    this.createAnimations.player('player', 'idle_right', 1, 80, 80);
    this.createAnimations.player('player', 'idle_up', 1, 92, 92);

    this.createAnimations.player('player', 'down', 6, 57, 59);
    this.createAnimations.player('player', 'left', 6, 69, 71);
    this.createAnimations.player('player', 'right', 6, 81, 83);
    this.createAnimations.player('player', 'up', 6, 93, 95);

    this.createAnimations.player('player', 'run_down', 8, 104, 107);
    this.createAnimations.player('player', 'run_left', 8, 116, 119);
    this.createAnimations.player('player', 'run_right', 8, 128, 131);
    this.createAnimations.player('player', 'run_up', 8, 140, 143);

    client.settings.player.skins.forEach(id => this.textures.get('player' + id).setFilter(Phaser.Textures.FilterMode.LINEAR));*/

    /*
    const test = [
      {case: [[0,-8,-21]],target:[0,2,-65]}, //x:13, y:26
      {case: [[1,2,-66],[1,1,-66],[1,3,-66]],target:[1,-8,-22]}
    ]

    const allDoor = [];

    test.forEach(door => {
      const target = door.target;
      allDoor.push(`{case:[${door.case.map(c => '[' + ([c[0],(c[1] - 5) * -1,(c[2] - 5) * -1]).toString() + ']').join(',')}],target:[${target[0]},${(target[1] - 5) * -1},${(target[2] - 5) * -1}]}`);
    });

    console.log(allDoor);*/

    setTimeout(() => {
      this.scene.start(client.scenes.key.world);
    }, client.settings.timeout.start);
  };
};

export default StartScene;