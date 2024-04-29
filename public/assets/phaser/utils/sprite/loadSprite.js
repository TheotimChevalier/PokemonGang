import { cacheClient, client } from "../index.js";

class LoadSprite {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene
  };

  /**
   * @param {number} id
   * @returns {Promise<void>}
   */
  player(id) {
    return new Promise((resolve, reject) => {
      const nameSprite = `player_${id}`;
      if(!this.scene.textures.exists(nameSprite)) {
        this.scene.load.spritesheet(nameSprite, `../../../assets/img/player/${nameSprite}_x32.png`, {frameWidth:client.settings.player.width, frameHeight:client.settings.player.height});
        this.scene.load.start();
  
        this.scene.load.once('complete', () => {
          this.scene.textures.get(nameSprite).setFilter(Phaser.Textures.FilterMode.LINEAR)

          this.scene.createAnimations.playerSprite(nameSprite, 'idle_down', 1, 56, 56);
          this.scene.createAnimations.playerSprite(nameSprite, 'idle_left', 1, 68, 68);
          this.scene.createAnimations.playerSprite(nameSprite, 'idle_right', 1, 80, 80);
          this.scene.createAnimations.playerSprite(nameSprite, 'idle_up', 1, 92, 92);
    
          this.scene.createAnimations.playerSprite(nameSprite, 'down', 6, 57, 59);
          this.scene.createAnimations.playerSprite(nameSprite, 'left', 6, 69, 71);
          this.scene.createAnimations.playerSprite(nameSprite, 'right', 6, 81, 83);
          this.scene.createAnimations.playerSprite(nameSprite, 'up', 6, 93, 95);
    
          this.scene.createAnimations.playerSprite(nameSprite, 'run_down', 8, 104, 107);
          this.scene.createAnimations.playerSprite(nameSprite, 'run_left', 8, 116, 119);
          this.scene.createAnimations.playerSprite(nameSprite, 'run_right', 8, 128, 131);
          this.scene.createAnimations.playerSprite(nameSprite, 'run_up', 8, 140, 143);

          resolve();
        });

        this.scene.load.once('loaderror', (file, error) => {
          reject(error);
        });
      } else {
        resolve();
      };
    });
  };

  /**
   * @param {string} nameSprite
   * @param {number} id
   * @param {"front" | "back" | "front/shiny" | "back/shiny"} folder
   * @param {{frameWidth:number;frameHeight:number}} pokemonJson
   * @returns {Promise<void>}
   */
  pokemonSprite(nameSprite, id, folder, pokemonJson) {
    return new Promise((resolve, reject) => {
      if(!pokemonJson) reject('no json data');

      if(!this.scene.textures.exists(nameSprite)) {
        this.scene.load.spritesheet(nameSprite, `../../../assets/img/pokemons/${folder}/${id}.png`, {frameWidth:pokemonJson.frameWidth, frameHeight:pokemonJson.frameHeight});
        this.scene.load.start();
  
        this.scene.load.once('complete', () => {
          console.log('complete load')
          this.scene.textures.get(nameSprite).setFilter(Phaser.Textures.FilterMode.LINEAR)

          this.scene.createAnimations.playerSprite(nameSprite, `idle`, 25, 0, pokemonJson.frames);

          resolve();
        });

        this.scene.load.once('loaderror', (file, error) => {
          reject(error);
        });
      } else {
        resolve();
      };
    });
  };
};

export { LoadSprite };