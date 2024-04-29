import { cacheClient } from "../index.js";

class CreatePokemon {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
    this.gender = [' ', ' ♂', ' ♀']
  };

  async wildFront(pokemon, pokemonSprite, pokemonEncountered) {
    const prefix = ['f_'];
    const prefixFolder = ['front'];
    const shiny = this._generateShiny();
    
    if(shiny) {
      prefix.push('s_');
      prefixFolder.push('shiny');
    };

    const nameSprite = `pokemon_${prefix.join('')}${pokemon.id}`;
    const pokemonJson = cacheClient.sprites.front.find(i => i.name === pokemon.id.toString());

    const level = Math.floor(Math.random() * (pokemonEncountered.level_max - pokemonEncountered.level_min)) + pokemonEncountered.level_min;
    //pokemonEncountered.level_max, pokemonEncountered.level_min

    await this.scene.loadSprite.pokemonSprite(nameSprite, pokemon.id, prefixFolder.join('/'), pokemonJson)
    const ivs = this._generateRandomIVs();
    const evs = this._generateRandomEVs();
    const gender = this._determineGender(pokemon.gender);
    const xp = this._calculerExperience(pokemon.leveling_rate, level);
    const hp = this._calculateHP(pokemon.base_stats_hp, ivs.hp, evs.hp, level);
    //const level = this._xpVersNiveau(pokemon.leveling_rate, xp);
    const moves = cacheClient.pokemons_moves.filter(i => i.id_pokemon === pokemon.id && i.level <= level).slice(0, 3);

    pokemonSprite = this.scene.add.sprite(280,160, nameSprite).setOrigin(0.5, 1);
    pokemonSprite.play(`${nameSprite}_idle`);

    const pokemonWildTextName = this.scene.add.text(45, 35, pokemon.name + this.gender[gender] + (shiny ? ' ✫' : ''), {
      fontFamily: 'W95FA',
      color: '#000000',
      fontSize: 12,
    }).setOrigin(0, 0);

    
    const pokemonPlayerBackTextLevel = this.scene.add.text(150, 35, `Lv${level}`, {
      fontFamily: 'W95FA',
      color: '#000000',
      fontSize: 12,
    }).setOrigin(1, 0);

    const pokemonWildHealthBar = new HealthBar(this.scene, 70, 55, hp, hp);
    
    this.scene.layer.pokemon.add(pokemonSprite);
    this.scene.layer.top.add(pokemonWildTextName, pokemonPlayerBackTextLevel, pokemonWildHealthBar);

    if(shiny) {
      //const particles = this.scene.add.particles('particle_shiny');
      const emitter = this.scene.add.particles(0, 0, 'particle_shiny', {
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD',
        alpha: { start: 1, end: 0, ease: 'Expo.easeIn' },
        lifespan: 300,
        emitZone: { source: new Phaser.Geom.Circle(0, 0, 50), type: 'edge', quantity: 20 },
      });
      emitter.startFollow(pokemonSprite);
      this.scene.layer.pokemon.add(emitter);

      setTimeout(() => {
        emitter.destroy()
      }, 1500)
    };

    return {ivs, evs, gender, xp, hp, level, shiny, moves, pokemon, hud: {
      pokemonWildTextName,
      pokemonWildHealthBar,
      pokemonSprite
    }};
  };

  async playerBack(pokemonSprite) {
    const pokemons = await this.getPokemonPlayerActif();

    const hud = {};
    const mainPokemon = [];
    let pokemonData = {};

    if(pokemons.length) {
      const pokemon = pokemons[0];
      mainPokemon.push(pokemon);
      const prefix = ['b_'];
      const prefixFolder = ['back'];
      if(pokemon.shiny) {
        prefix.push('s_');
        prefixFolder.push('shiny');
      }
      const nameSprite = `pokemon_${prefix.join('')}${pokemon.id_pokemon}`;
      const pokemonJson = cacheClient.sprites.back.find(i => i.name === pokemon.id_pokemon.toString());
      pokemonData = cacheClient.pokemons.find(i => i.id === pokemon.id_pokemon)

      await this.scene.loadSprite.pokemonSprite(nameSprite, pokemon.id_pokemon, prefixFolder.join('/'), pokemonJson);
      pokemonSprite = this.scene.add.sprite(90,250, nameSprite).setOrigin(0.5, 1);
      pokemonSprite.play(`${nameSprite}_idle`);

      const pokemonPlayerBackTextName = this.scene.add.text(230, 190, (pokemon.surname || pokemonData.name) + this.gender[pokemon.gender] + (pokemon.shiny ? ' ✫' : ''), {
        fontFamily: 'W95FA',
        color: '#000000',
        fontSize: 12,
      }).setOrigin(0, 0);
      
      const level = this._xpVersNiveau(pokemonData.leveling_rate, pokemon.xp);
      const maxHp = this._calculateHP(pokemonData.base_stats_hp, pokemon.iv_hp, pokemon.ev_yield_hp, level);
      const nextLevelXp = this._calculerExperience(pokemonData.leveling_rate, level + 1);
      const currentLevelXp = this._calculerExperience(pokemonData.leveling_rate, level);
      const ecartMaxXp = nextLevelXp - currentLevelXp;
      const ecartXp = pokemon.xp - currentLevelXp;

      const pokemonPlayerBackHealthBar = new HealthBar(this.scene, 255, 210, pokemon.hp, maxHp);
      const pokemonPlayerXpBarBar = new XPBar(this.scene, 230, 235, ecartXp, ecartMaxXp);
  

      const pokemonPlayerBackTextHp = this.scene.add.text(335, 222, `${pokemon.hp}/${maxHp}`, {
        fontFamily: 'W95FA',
        color: '#000000',
        fontSize: 12,
      }).setOrigin(1, 0);

      const pokemonPlayerBackTextLevel = this.scene.add.text(335, 190, `Lv${level}`, {
        fontFamily: 'W95FA',
        color: '#000000',
        fontSize: 12,
      }).setOrigin(1, 0);

      this.scene.layer.top.add(pokemonPlayerBackTextName, pokemonPlayerBackHealthBar, pokemonPlayerBackTextHp, pokemonPlayerBackTextLevel, pokemonPlayerXpBarBar);

      hud.pokemonPlayerBackTextName = pokemonPlayerBackTextName;
      hud.pokemonPlayerBackHealthBar = pokemonPlayerBackHealthBar;
      hud.pokemonPlayerBackTextHp = pokemonPlayerBackTextHp;
      hud.pokemonPlayerBackTextLevel = pokemonPlayerBackTextLevel;
      hud.pokemonPlayerXpBarBar = pokemonPlayerXpBarBar;
      hud.pokemonSprite = pokemonSprite;

      if(pokemon.shiny) {
        //const particles = this.scene.add.particles('particle_shiny');
        const emitter = this.scene.add.particles(0, 0, 'particle_shiny', {
          speed: 100,
          scale: { start: 1, end: 0 },
          blendMode: 'ADD',
          alpha: { start: 1, end: 0, ease: 'Expo.easeIn' },
          lifespan: 300,
          emitZone: { source: new Phaser.Geom.Circle(0, 0, 50), type: 'edge', quantity: 20 },
        });
        emitter.startFollow(pokemonSprite);
        this.scene.layer.pokemon.add(emitter);

        setTimeout(() => {
          emitter.destroy()
        }, 1500)
      };
    };

    this.scene.layer.pokemon.add(pokemonSprite);
    
    return {pokemons, hud, mainPokemon, pokemonData};
  };

  async getPokemonPlayerActif() {
    const response = await fetch('/api/game/pokemon/player/actif');
    const data = await response.json();
    return data.pokemons;
  }

  _generateRandomIVs() {
    return {
      hp: Math.floor(Math.random() * 32),
      atk: Math.floor(Math.random() * 32),
      def: Math.floor(Math.random() * 32),
      spAtk: Math.floor(Math.random() * 32),
      spDef: Math.floor(Math.random() * 32),
      speed: Math.floor(Math.random() * 32)
    };
  }

  _generateRandomEVs() {
    const evs = { hp: 0, atk: 0, def: 0, spAtk: 0, spDef: 0, speed: 0 };
    let totalEVs = 510;
    while (totalEVs > 0) {
      const stat = ['hp', 'atk', 'def', 'spAtk', 'spDef', 'speed'][Math.floor(Math.random() * 6)];
      const increase = Math.min(Math.floor(Math.random() * (totalEVs + 1)), 255 - evs[stat]);
      evs[stat] += increase;
      totalEVs -= increase;
    };
  
    return evs
  };

  _determineGender(gender) {
    if (gender === -1) return 0;
    return Math.random() * 100 < gender ? 1 : 2;
  };

  _calculerExperience(idEvolution, niveau) {
    let experience = 0;

    switch (idEvolution) {
      case 1: // Slow
        experience = 5 * Math.pow(niveau, 3) / 4;
        break;
      case 2: // Medium Fast
        experience = Math.pow(niveau, 3);
        break;
      case 3: // Medium Slow
        experience = 6/5 * Math.pow(niveau, 3) - 15 * Math.pow(niveau, 2) + 100 * niveau - 140;
        break;
      case 4: // Fast
        experience = 4 * Math.pow(niveau, 3) / 5;
        break;
      case 5: // Erratic
        if (niveau < 50) {
          experience = Math.pow(niveau, 3) * (100 - niveau) / 50;
        } else if (niveau >= 50 && niveau < 68) {
          experience = Math.pow(niveau, 3) * (150 - niveau) / 100;
        } else if (niveau >= 68 && niveau < 98) {
          experience = Math.pow(niveau, 3) * ((1911 - 10 * niveau) / 3) / 500;
        } else {
          experience = Math.pow(niveau, 3) * (160 - niveau) / 100;
        }
        break;
      case 6: // Fluctuating
        if (niveau < 15) {
          experience = Math.pow(niveau, 3) * ((niveau + 1) / 3 + 24) / 50;
        } else if (niveau >= 15 && niveau < 36) {
          experience = Math.pow(niveau, 3) * (niveau + 14) / 50;
        } else {
          experience = Math.pow(niveau, 3) * ((niveau / 2) + 32) / 50;
        }
        break;
      default:
        console.log("ID d'évolution inconnu");
        return -1;
    }
      return Math.floor(experience);
  };

  _xpVersNiveau(idEvolution, xp) {
    let niveau = 0;

    switch (idEvolution) {
      case 1: // Slow
        niveau = Math.cbrt(4 * xp / 5);
        break;
      case 2: // Medium Fast
        niveau = Math.cbrt(xp);
        break;
      case 3: // Medium Slow
        while ((6/5 * Math.pow(niveau, 3) - 15 * Math.pow(niveau, 2) + 100 * niveau - 140) < xp) {
          niveau++;
        }
        break;
      case 4: // Fast
        niveau = Math.cbrt(5 * xp / 4);
        break;
      case 5: // Erratic
        while (this._calculerExperience(5, niveau) < xp) {
          niveau++;
        }
        break;
      case 6: // Fluctuating
        while (this._calculerExperience(6, niveau) < xp) {
          niveau++;
        }
        break;
      default:
        console.log("ID d'évolution inconnu");
        return -1;
    };
    return Math.floor(niveau);
  }

  _calculateHP(baseStatsHP, ivsHP, evsHP, level) {
    return Math.floor(((2 * baseStatsHP + ivsHP + Math.sqrt(evsHP) / 4) * level) / 100) + level + 10;
  };

  _generateShiny() {
    return Math.floor(Math.random() * 99) + 1 === 1;
  };


};

class HealthBar {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   * @param {number} value 
   * @param {number} maxValue 
   */
  constructor (scene, x, y, value, maxValue)
  {
      this.bar = new Phaser.GameObjects.Graphics(scene);

      this.x = x;
      this.y = y;
      this.value = value;
      this.maxValue = maxValue;
      this.width = 80;
      this.height = 8;

      this.draw();

      scene.add.existing(this.bar);
  }

  updateValue(value) {
    this.value = value;

    if (this.value < 0) {
        this.value = 0;
    }
    if (this.value > this.maxValue) {
        this.value = this.maxValue;
    }

    this.draw();
  }

  draw() {
      this.bar.clear();

      this.bar.fillStyle(0x000000);
      this.bar.fillRect(this.x, this.y, this.width, this.height);

      // Barre de vie
      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);

      var color = this.getColor(this.value / this.maxValue);

      // Barre de vie
      this.bar.fillStyle(color);
      var d = Math.floor((this.width - 2) * (this.value / this.maxValue));
      this.bar.fillRect(this.x + 1, this.y + 1, d, this.height - 2);
  }

  getColor(percentage) {
    const red = Math.min(255, Math.floor(255 * (1 - percentage) * 2));
    const green = Math.min(255, Math.floor(255 * percentage * 2));
    const blue = 0;
    return (red << 16) + (green << 8) + blue;
  }
}

class XPBar {
  /**
   * @param {Phaser.Scene} scene 
   * @param {number} x 
   * @param {number} y 
   * @param {number} value 
   * @param {number} maxValue 
   */
  constructor (scene, x, y, value, maxValue)
  {
      this.bar = new Phaser.GameObjects.Graphics(scene);

      this.x = x;
      this.y = y;
      this.value = value;
      this.maxValue = maxValue;
      this.width = 105;
      this.height = 4;

      this.draw();

      scene.add.existing(this.bar);
  }

  setValue(newValue) {
    this.value = newValue;

    if (this.value < 0) {
        this.value = 0;
    }
    if (this.value > this.maxValue) {
        this.value = this.maxValue;
    }

    this.draw();
  }

  draw() {
      this.bar.clear();

      this.bar.fillStyle(0xecd6a7);
      this.bar.fillRect(this.x, this.y, this.width, this.height);

      // Barre de vie
      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);

      // Barre de vie
      this.bar.fillStyle(0x33c1ff);
      var d = Math.floor((this.width - 2) * (this.value / this.maxValue));
      this.bar.fillRect(this.x + 1, this.y + 1, d, this.height - 2);
  }

  
}

export { CreatePokemon };