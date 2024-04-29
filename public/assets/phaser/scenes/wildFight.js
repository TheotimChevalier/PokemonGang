import { cacheClient, client, CreateKeyboard, CreatePokemon, LoadSprite, CreateAnimations, CreateLayer } from '../utils/index.js';

const smallText = {
  fontFamily: 'W95FA',
  color: '#000000',
  fontSize: 12,
};

const mediumText = {
  fontFamily: 'W95FA',
  color: '#000000',
  fontSize: 22,
};

class WildFightScene extends Phaser.Scene {
  constructor() {
    super({key: client.scenes.key.wildFight});

    this.lastUpdateTime = 0;
    this.updateInterval = client.settings.speed.walk;

    this.createKeyboard = new CreateKeyboard(this);
    this.loadSprite = new LoadSprite(this);
    this.createAnimations = new CreateAnimations(this);

    this.createPokemon = new CreatePokemon(this);

    this.createLayer = new CreateLayer(this);

    this.layer = {};

    this.pokemonWild = {};
    this.pokemonWildSprite = {};

    this.pokemonPlayerSprite = {};

    this.hudFightBackground = {};
    this.hudFightTop = {};
    this.hudFightTopAction = {};

    this.indexCurserX = 0;
    this.indexCurserY = 0;
    this.textIndexCurseur = {};

    this.currentMenuIndex = 1;

    /**
     * @type {Phaser.GameObjects.Sprite}
     */
    this.currentMenuHUD = {};
    /**
     * @type {Phaser.GameObjects.Text}
     */
    this.currentTextHUD = {};
    /**
     * @type {Array<Phaser.GameObjects.Text>}
     */
    this.attackPlayerPokemon = []

    this.fightMenu = [
      {
        index:-1, //leave fight
        indexX:0,
        indexY:0,
        maxIndexX:0,
        maxIndexY:0,
        back:0,
        trigger:[]
      },
      {
        index:0, //menu vide
        indexX:0,
        indexY:0,
        maxIndexX:0,
        maxIndexY:0,
        back:0,
        trigger:[]
      },
      { 
        index:1, //le fight, bag, pokemon, run
        frame:2, //frame de l'hud
        indexX:0, //x index
        indexY:0, //y index
        maxIndexX:2, //x total index
        maxIndexY:2, //y total index
        back:1, //si touche back allors triger index
        label: {
          x:220,
          y:288,
          paddingX:85,
          paddingY:48,
          label: '▶',
        },
        trigger: [
          [0, 0, 2],
          [1, 0, 1],
          [0, 1, 1],
          [1, 1, -1],
        ],
      },
      {
        index:2, //choix attaque
        frame:3,
        indexX:0,
        indexY:0,
        maxIndexX:2,
        maxIndexY:2,
        back:1,
        showAttackPlayer:true,
        trigger:[],
        label: {
          x:16,
          y:290,
          paddingX:95,
          paddingY:35,
          label: '▶',
        },
        trigger: [
          [0, 0, 0],
          [1, 0, 1],
          [0, 1, 2],
          [1, 1, 3],
        ],
      }
    ];

    this.playerPokemons = {};
    this.mainAttack = [];
    this.isFirstAttack = true;
    this.isPlayerFirst = true;
  };

  async preload() {
    console.log(this.scene.key);
    this.createKeyboard.wildFight();

    client.player.freeze = false;
    this.isFirstAttack = true;
    this.currentMenuIndex = 1;

  };

  async create() {
    this.currentMenuHUD = this.add.sprite(0, 0, 'hud_fight_0').setFrame(0).setOrigin(0, 0).setVisible(false);
    this.currentTextHUD = this.add.text(0, 0, 'place_holder', smallText).setOrigin(1, 1).setVisible(false);


    this.createLayer.wildFight();

    this.hudFightBackground = this.add.sprite(0, 0, 'hud_fight_0').setFrame(1).setOrigin(0, 0);
    this.layer.background.add(this.hudFightBackground);

    this.hudFightTop = this.add.sprite(0, 0, 'hud_fight_0').setFrame(0).setOrigin(0, 0);    
    this.layer.top.add(this.hudFightTop);

    //this.hudFightTopAction = this.add.sprite(0, 0, 'hud_fight_0').setFrame(2).setOrigin(0, 0);    
    //this.layer.top.add(this.hudFightTopAction);

    const pokemonEncountered = cacheClient.zone_encounters.find(i => i.id === client.pokemon.encounter.last);
    const pokemon = cacheClient.pokemons.find(i => i.id === pokemonEncountered.id_pokemon);
    
    this.pokemonWild = await this.createPokemon.wildFront(pokemon, this.pokemonWildSprite, pokemonEncountered);
    console.log(this.pokemonWild);

    this.playerPokemons = await this.createPokemon.playerBack(this.pokemonPlayerSprite);
    console.log(this.playerPokemons);

    this.updateMenuHUD();
  };

  update(time, detla) {
    if(!client.player.freeze && time - this.lastUpdateTime >= this.updateInterval) {
      const keys = client.keys.keys;
      const upKey = keys.up.isDown;
      const downKey = keys.down.isDown;
      const rightKey = keys.right.isDown;
      const leftKey = keys.left.isDown;
      const backKey = keys.b.isDown;
      const spaceKey = keys.space.isDown;
      if(upKey || downKey || rightKey || leftKey) {

        const curruntMenu = this.fightMenu.find(i => i.index === this.currentMenuIndex);
        if(curruntMenu) {
          if(curruntMenu.label) {
            if(rightKey) {
              curruntMenu.indexX = (curruntMenu.indexX + 1) % curruntMenu.maxIndexX;
            } else if(leftKey) {
              curruntMenu.indexX = (curruntMenu.indexX - 1 + curruntMenu.maxIndexX) % curruntMenu.maxIndexX;
            } else if(downKey) {
              curruntMenu.indexY = (curruntMenu.indexY + 1) % curruntMenu.maxIndexY;
            } else if(upKey) {
              curruntMenu.indexY = (curruntMenu.indexY - 1 + curruntMenu.maxIndexY) % curruntMenu.maxIndexY;
            };

            this.currentTextHUD.x = curruntMenu.label.x + curruntMenu.indexX * curruntMenu.label.paddingX;
            this.currentTextHUD.y = curruntMenu.label.y + curruntMenu.indexY * curruntMenu.label.paddingY;
            //console.log({indexX:curruntMenu.indexX,indexY:curruntMenu.indexY})
          };
        };

        this.lastUpdateTime = time;
      } else if(backKey) {
        const curruntMenu = this.fightMenu.find(i => i.index === this.currentMenuIndex);
        if(curruntMenu) {
          this.currentMenuIndex = curruntMenu.back;
          this.updateMenuHUD();
        }
        this.lastUpdateTime = time;
      } else if(spaceKey) {
        const curruntMenu = this.fightMenu.find(i => i.index === this.currentMenuIndex);
        if(curruntMenu) {
          if(curruntMenu.showAttackPlayer) {

            const attackSelectIndex = curruntMenu.trigger.find(i => i[0] === curruntMenu.indexX && i[1] === curruntMenu.indexY) || [0,0,0];
            const attackSelect = this.mainAttack[attackSelectIndex[2]]
            //console.log(attackSelect, curruntMenu.indexX, curruntMenu.indexY)

            if(this.isFirstAttack) {
              this.isFirstAttack = false;
              this.startFight(attackSelect)
            } else {
              this.fighting(attackSelect);
            }
            //ici le joueur séletionne sont attaque donc ça eclanche le trigger
          } else {
            const nextIndex = curruntMenu.trigger.find(i => i[0] === curruntMenu.indexX && i[1] === curruntMenu.indexY);
            if(nextIndex) {
              this.currentMenuIndex = nextIndex[2];
              this.updateMenuHUD();
            }
          }
          
        }
        this.lastUpdateTime = time;
      }
    }
  };

  updateMenuHUD() {
    //console.log({currentMenuIndex: this.currentMenuIndex})
    if(this.currentMenuIndex === -1) {
      this.scene.start(client.scenes.key.world)
    } else {
      const curruntMenu = this.fightMenu.find(i => i.index === this.currentMenuIndex);
      //console.log({curruntMenu})
  
      if(curruntMenu) {
        this.currentMenuHUD.setVisible(false);
        this.currentTextHUD.setVisible(false);
        /*try {
          this.currentMenuHUD.destroy();
          this.currentTextHUD.destroy();
        } catch {
          console.log('delete impossible')
        };*/
        try {
          this.attackPlayerPokemon.forEach(i => i.destroy());
        } catch {};
        curruntMenu.indexX = 0;
        curruntMenu.indexY = 0;
        if(curruntMenu.frame) this.currentMenuHUD = this.add.sprite(0, 0, 'hud_fight_0').setFrame(curruntMenu.frame).setOrigin(0, 0);
        if(curruntMenu.label) this.currentTextHUD = this.add.text(curruntMenu.label.x, curruntMenu.label.y, curruntMenu.label.label, smallText).setOrigin(1, 1);
        if(curruntMenu.showAttackPlayer) {
          this.playerPokemons.mainPokemon.forEach(i => {
            this.mainAttack.push(
              {
                move: cacheClient.moves.find(move => move.id === i.move_0),
                pp: i.move_0_pp
              },
              {
                move: cacheClient.moves.find(move => move.id === i.move_1),
                pp: i.move_1_pp
              },
              {
                move: cacheClient.moves.find(move => move.id === i.move_2),
                pp: i.move_2_pp
              },
              {
                move: cacheClient.moves.find(move => move.id === i.move_3),
                pp: i.move_3_pp
              }
            );
          })
          //console.log(this.mainAttack)
          if(this.mainAttack[0].move) {
            this.attackPlayerPokemon.push(this.add.text(20, 270, this.mainAttack[0].move.name, mediumText).setOrigin(0, 0));
            curruntMenu.maxIndexX = 1;
          };
          if(this.mainAttack[1].move) {
            this.attackPlayerPokemon.push(this.add.text(115, 270, this.mainAttack[1].move.name, mediumText).setOrigin(0, 0));
            curruntMenu.maxIndexX = 2;

          };
          if(this.mainAttack[2].move) {
            this.attackPlayerPokemon.push(this.add.text(20, 305, this.mainAttack[2].move.name, mediumText).setOrigin(0, 0));
            curruntMenu.maxIndexY = 1;

          };
          if(this.mainAttack[3].move) {
            this.attackPlayerPokemon.push(this.add.text(115, 305, this.mainAttack[3].move.name, mediumText).setOrigin(0, 0));
            curruntMenu.maxIndexY = 2;

          };
        }
      };
    }; 
  };

  async startFight(attackSelect) {
    client.player.freeze = true;
    this.currentMenuIndex = 0;
    this.updateMenuHUD();

    const { firstWildAttack, firstWildAttackMove } = this.selectAttackWildPokemon();
    console.log('wild pokemon first attack', firstWildAttackMove.name)
    console.log('player pokemon first attack', attackSelect.move.name);

    this.isPlayerFirst = this.determineFirstAttacker(
      this.playerPokemons.mainPokemon[0],
      this.playerPokemons.pokemonData,
      attackSelect.move,

      {
        iv_speed: this.pokemonWild.ivs.speed,
        ev_yield_speed: this.pokemonWild.evs.speed,
      },
      this.pokemonWild.pokemon,
      firstWildAttackMove
    );

    console.log('player start', this.isPlayerFirst);

    await this.pokemonAttackAnim(this.isPlayerFirst);
    await this.pokemonAttackAnim(!this.isPlayerFirst);

    if(!this.isPlayerFirst) {
      const { firstWildAttack, firstWildAttackMove } = this.selectAttackWildPokemon();

      await this.pokemonAttackAnim(false);
    }

    this.currentMenuIndex = 1;
    this.updateMenuHUD();
    client.player.freeze = false;
  };

  async fighting(attackSelect) {
    client.player.freeze = true;
    this.currentMenuIndex = 0;
    this.updateMenuHUD();

    await this.pokemonAttackAnim(true);
    await this.pokemonAttackAnim(false);

    this.currentMenuIndex = 1;
    this.updateMenuHUD();
    client.player.freeze = false;
  };

  async pokemonAttackAnim(isPlayer) {
    return new Promise((resolve, reject) => {
      if(isPlayer) {
        this.tweens.add({
          targets: this.playerPokemons.hud.pokemonSprite,
          x: this.playerPokemons.hud.pokemonSprite.x + 75,
          y: this.playerPokemons.hud.pokemonSprite.y - 75,
          ease: 'Linear',
          duration: 500,
          yoyo:true,
          onComplete:(() => {
            this.pokemonWild.hp += -2;
            this.pokemonWild.hud.pokemonWildHealthBar.updateValue(this.pokemonWild.hp);

            resolve()
          })
        })
      } else {
        this.tweens.add({
          targets: this.pokemonWild.hud.pokemonSprite,
          x: this.pokemonWild.hud.pokemonSprite.x - 75,
          y: this.pokemonWild.hud.pokemonSprite.y + 75,
          ease: 'Linear',
          duration: 500,
          yoyo:true,
          onComplete:(() => {
            this.playerPokemons.mainPokemon[0].hp += -2;
            this.playerPokemons.hud.pokemonPlayerBackHealthBar.updateValue(this.playerPokemons.mainPokemon[0].hp);
            resolve()
          })
        })
      }
    })
  };

  selectAttackWildPokemon() {
    const firstWildAttack = this.pokemonWild.moves[Math.floor(Math.random() * this.pokemonWild.moves.length)];
    const firstWildAttackMove = cacheClient.moves.find(i => i.id === firstWildAttack.id_move);
    return { firstWildAttack, firstWildAttackMove };
  };

  determineFirstAttacker(pokemon1, pokemon1Data, move1, pokemon2, pokemon2Data, move2) {
    if(move1.priority > move2.priority) {
      return true;
    } else if(move2.priority > move1.priority){
      return false;
    };

    const speed1 = this.calculateSpeed(pokemon1,pokemon1Data);
    const speed2 = this.calculateSpeed(pokemon2,pokemon2Data);

    if (speed1 > speed2) {
      return true;
    } else if (speed2 > speed1) {
        return false;
    };

    return Math.random() < 0.5 ? true : false;
  };

  calculateSpeed(pokemon, pokemonData) {
    return pokemonData.base_stats_speed + pokemon.iv_speed + pokemon.ev_yield_speed;
  };

  updateHealthBar() {

  }
};

export default WildFightScene