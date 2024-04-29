import { SocketEvent, cacheClient, client } from "../index.js";

class PlayerMove {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
    this.socketEvent = new SocketEvent(this);

    this.opositeRotation = [1,0,3,2]
  };

  move(time) {
    const keys = client.keys.keys;
    const upKey = keys.up.isDown;
    const downKey = keys.down.isDown;
    const rightKey = keys.right.isDown;
    const leftKey = keys.left.isDown;
    const prefixRun = keys.shift.isDown ? 'run_' : '';

    if(upKey || downKey || rightKey || leftKey) {
      let x = client.x;
      let y = client.y
      let teleport = false;

      //this.scene.scene.get(client.scenes.key.hud).popUpZoneName()

      if(upKey) {
        y -= 1;
        client.player.rotation = client.animation.player.rotation.up;
        this.scene.updateAnimation.player(`${prefixRun}up`);
      } else if(downKey) {
        y += 1;
        client.player.rotation = client.animation.player.rotation.down;
        this.scene.updateAnimation.player(`${prefixRun}down`);
      } else if(leftKey) {
        x -= 1;
        client.player.rotation = client.animation.player.rotation.left;
        this.scene.updateAnimation.player(`${prefixRun}left`);
      } else if(rightKey) {
        x += 1;
        client.player.rotation = client.animation.player.rotation.right;
        this.scene.updateAnimation.player(`${prefixRun}right`);
      };

      const nextMapXPixel = x * client.settings.world.sizePixelTile;
      const nextMapYPixel = y * client.settings.world.sizePixelTile;
      const world = client.world.currentWorld.worldData;
      const isMap = (world.leftX < nextMapXPixel && world.rightX > nextMapXPixel) && (world.topX < nextMapYPixel && world.bottomX > nextMapYPixel);
      if(isMap) {
        const localY = y - (client.player.y / client.settings.world.sizePixelTile);
        
        const nextCurrentTiles = client.world.currentWorld.collisionLayer.layer.data[localY][x].index - 1;
        const itemMap = client.world.currentItemsWorld.find(i => i.x === x && i.y === localY && i.world === client.currentIndexWorld);
        const collision = client.world.tiles.find(i => i.id === nextCurrentTiles && i.properties[0].name === client.settings.tilesProperties.collision) || itemMap;
        const door = client.world.currentWorld.worldData.door.find(i => i.case.find(z => z[0] === client.player.rotation && z[1] === x && z[2] === localY));

        //const zone = client.world.zones.zones.find(i => i.start_x <= x && i.end_x >= x && i.start_y <= y && i.end_y >= y);
        const zone = cacheClient.zones.find(i => i.start_x <= x && i.end_x >= x && i.start_y <= y && i.end_y >= y);
        if(zone) {
          if(client.world.lastZone != zone.name) {
            client.world.lastZone = zone.name;
            this.scene.scene.get(client.scenes.key.hud).popUpZoneName(zone.name)
          };

          //const pokemonsZone = client.world.zones.zone_encounters.filter(i => i.id_zone === zone.id);
          const pokemonsZone = cacheClient.zone_encounters.filter(i => i.id_zone === zone.id);
          const isGrassTiles = client.world.tiles.find(i => i.id === nextCurrentTiles && i.properties[0].name === client.settings.tilesProperties.grass)
          if(pokemonsZone.length && isGrassTiles) {
            const encounter = (Math.floor(Math.random() * 100) + 1) <= client.pokemon.zone.rate;
            if(encounter) {
              client.player.freeze = true;

              let maxRandom = 0

              /**
               * @type {Array<{id:number,min:number,max:number}>}
               */
              const pokemonRateMatrice = [];
              let indexRate = 0;
              pokemonsZone.forEach(i => {
                maxRandom += i.rate;

                pokemonRateMatrice.push({
                  id:i.id,
                  min: indexRate + 1,
                  max: indexRate + i.rate 
                });

                indexRate += i.rate;
              });

              const pokemonEncounteredValue = Math.floor(Math.random() * maxRandom) + 1;
              const pokemonEncountered = pokemonRateMatrice.find(i => i.min <= pokemonEncounteredValue && i.max >= pokemonEncounteredValue) || pokemonRateMatrice[0];
              client.pokemon.encounter.last = pokemonEncountered.id;  
              
              setTimeout(() => {
                this.scene.scene.start(client.scenes.key.wildFight)
              }, 1000)
            }
          }
        };

        if(door) {
          teleport = true;
          client.player.rotation = door.target[0];
          client.x = door.target[1];
          client.y = door.target[2];
          this.scene.multiplayer.emit(this.socketEvent.Emit.SaveLastPosition);
        } else if(!collision || !client.settings.player.collision) {
          const isStrait = client.world.tiles.find(i => i.id === nextCurrentTiles && i.properties[0].name === client.settings.tilesProperties.stair);
          if(isStrait) {
            const decal = isStrait.properties[0].value;
            if(decal != client.player.y) {
              client.player.y = decal;
              this.scene.tweens.add({
                targets: client.player.player,
                y: client.player.defaultPosition.y - decal,
                duration: this.scene.updateInterval,
                ease: 'Linear'
              });
            };
          };

          client.x = x;
          client.y = y;
        };
      } else if(!client.settings.player.collision) {
        client.x = x;
        client.y = y;
      };

      if(teleport) {
        this.scene.layer.player.x = client.x * client.settings.world.sizePixelTile;
        this.scene.layer.player.y = client.y * client.settings.world.sizePixelTile;
      } else {
        this.scene.tweens.add({
          targets: this.scene.layer.player,
          x: client.x * client.settings.world.sizePixelTile,
          y: client.y * client.settings.world.sizePixelTile,
          duration: this.scene.updateInterval,
          ease: 'Linear'
        });
      };
      
      this.scene.updateHTML.update();
      this.scene.multiplayer.emit(this.socketEvent.Emit.PlayerMove, teleport);

      this.scene.lastUpdateTime = time;
    } else if(!upKey && !downKey && !rightKey && !leftKey) {
      this.scene.updateAnimation.player(client.animation.player.idles[client.player.rotation]);
    };
  };
};

export { PlayerMove };