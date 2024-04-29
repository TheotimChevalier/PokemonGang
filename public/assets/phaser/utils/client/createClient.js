const sizePixelTile = 32;
const sizeChunck = 11;

//player
const playerDefaultRotation = 1;

//rotation
const rotationUp = 0;
const rotationDown = 1;
const rotationRight = 2;
const rotationLeft = 3;
//0:up,1:down,2:right,3:left
//animation
const playerIdleAnimations = ['idle_up', 'idle_down', 'idle_right', 'idle_left'];
const playerLastAnimation = playerIdleAnimations[playerDefaultRotation];

//multiplayer
const socket = io();

/**
 * @typedef {Object} ClientWorldsMap
 * @property {string} name
 * @property {number} totalCaseX
 * @property {number} totalCaseY
 * @property {number} index
 * @property {string} path
 * @property {number} chunckSizeX
 * @property {number} chunckSizeY
 * @property {number} leftX
 * @property {number} rightX
 * @property {number} topX
 * @property {number} bottomX
 * @property {Array<Object>} door
 */

/**
 * @typedef {Object} CurrentWorld
 * @property {ClientWorldsMap} worldData
 * @property {Phaser.Tilemaps.Tilemap} map
 * @property {Phaser.Tilemaps.TilemapLayer} bottomLayer
 * @property {Phaser.Tilemaps.TilemapLayer} middle1Layer
 * @property {Phaser.Tilemaps.TilemapLayer} middle2Layer
 * @property {Phaser.Tilemaps.TilemapLayer} topLayer1
 * @property {Phaser.Tilemaps.TilemapLayer} topLayer2
 * @property {Phaser.Tilemaps.TilemapLayer} collisionLayer
 */

/**
 * @typedef {Object} ClientWorldCurrentItemsWorld
 * @property {number} id
 * @property {number} id_item
 * @property {number} spritesheet
 * @property {number} value
 * @property {number} world
 * @property {number} x 
 * @property {number} y
 */

/**
 * @typedef {Object} ClientWorldsTilesArray
 * @property {number} id
 * @property {Array<{name:string,type:string,value:number|boolean}>} properties
 */

/**
 * @typedef {Object} ClientWorldZonesZones
 * @property {number} id
 * @property {string} name
 * @property {number} id_world
 * @property {number} start_x
 * @property {number} start_y
 * @property {number} end_x
 * @property {number} end_y
 */

/**
 * @typedef {Object} ClientWorldZonesZoneEncounters
 * @property {number} id
 * @property {number} id_zone
 * @property {number} id_pokemon
 * @property {number} rate
 * @property {number} level_min
 * @property {number} level_max
 */

/**
 * @typedef {Object} ClientWorldZones
 * @property {Array<ClientWorldZonesZones>} zones
 * @property {Array<ClientWorldZonesZoneEncounters>} zone_encounters
 */

/**
 * @typedef {Object} ClientWorld
 * @property {CurrentWorld} currentWorld
 * @property {Array<ClientWorldCurrentItemsWorld>} currentItemsWorld
 * @property {Map<number, ClientWorldsMap>} worlds
 * @property {Array<ClientWorldsTilesArray>} tiles
 * @property {ClientWorldZones} zones
 * @property {string} lastZone
 */

/**
 * @typedef {Object} ClientPlayer
 * @property {number} rotation
 * @property {number} skin
 * @property {boolean} freeze
 * @property {Phaser.GameObjects.Sprite} player
 * @property {number} y
 * @property {{x:number,y:number}} defaultPosition
 */

/**
 * @typedef {Object} ClientScenesKey
 * @property {string} start
 * @property {string} world
 * @property {string} stop
 * @property {string} hud
 * @property {string} inventory
 * @property {string} wildFight
 */

/**
 * @typedef {Object} ClientScenes
 * @property {string} currentKey
 * @property {ClientScenesKey} key
 */

/**
 * @typedef {Object} ClientAnimationPlayerRotation
 * @property {number} up
 * @property {number} down
 * @property {number} left
 * @property {number} right
 */

/**
 * @typedef {Object} ClientAnimationPlayer
 * @property {ClientAnimationPlayerRotation} rotation
 * @property {string} last
 * @property {string} first
 * @property {Array<string>} idles
 */

/**
 * @typedef {Object} ClientAnimation
 * @property {ClientAnimationPlayer} player
 */

/**
 * @typedef {Object} ClientMultiplayerOtherPlayer
 * @property {Phaser.GameObjects.Sprite} player
 * @property {Phaser.GameObjects.Text} username
 * @property {number} x
 * @property {number} y
 * @property {number} rotation
 * @property {number} skin
 * @property {number} scale
 * @property {string} scene
 * @property {number} world
 */

/**
 * @typedef {Object} ClientMultiplayer
 * @property {{usernameY:number}} config
 * @property {Socket} socket
 * @property {Map<string, ClientMultiplayerOtherPlayer>} otherPlayers
 */

/**
 * @typedef {Object} ClientHud
 * @property {boolean} inventory
 */

/**
 * @typedef {Object} ClientPokemonZone
 * @property {number} rate
 */

/**
 * @typedef {Object} ClientPokemonEncounter
 * @property {number} last
 */

/**
 * @typedef {Object} ClientPokemon
 * @property {ClientPokemonZone} zone
 * @property {ClientPokemonEncounter} encounter
 */

/**
 * @typedef {Object} ClientSettings
 * @property {{start: number,menuSwitch:number}} timeout
 * @property {{walk:number,run:number}} speed
 * @property {{width:number,height:number}} game
 * @property {{sizeChunck:number,sizePixelTile:number,sizePixelChunck:number}} world
 * @property {{collision:boolean,width:number,height:number,scale:number,yCorrection:number,xCorrection:number,skins:number}} player
 * @property {{collision:string,grass:string,water:string,stair:string}} tilesProperties
 * 
 */

/**
 * @typedef {Object} Client
 * @property {number} x 
 * @property {number} y
 * @property {number} currentIndexWorld 
 * @property {ClientWorld} world
 * @property {ClientPlayer} player
 * @property {ClientScenes} scenes
 * @property {ClientAnimation} animation
 * @property {ClientMultiplayer} multiplayer
 * @property {ClientHud} hud
 * @property {ClientPokemon} pokemon
 * @property {ClientSettings} settings
 */

/** @type {Client} */
const client = {
  x:1,
  y:1,
  currentIndexWorld: 0,
  world: {
    currentItemsWorld: [],
    currentWorld: {},
    worlds: new Map(),
    tiles: {},
    zones: {},
    lastZone: 'none'
  },
  player: {
    rotation: playerDefaultRotation,
    skin: 0,
    freeze:false,
    player: {},
    y:0,
    defaultPosition: {
      y:0,
      x:0
    }
  },
  scenes: {
    currentKey: '',
    key: {
      start: 'StartScene',
      world: 'WorldScene',
      stop: 'StopScene',
      hud: 'HUDScene',
      inventory: 'InventoryScene',
      wildFight: 'WildFightScene'
    }
  },
  animation: {
    player: {
      rotation: {
        up: rotationUp,
        down: rotationDown,
        left: rotationLeft,
        right: rotationRight,
      },
      last: 'none',
      first: playerLastAnimation,
      idles: playerIdleAnimations
    },
  },
  keys: {
    keys: {}
  },
  multiplayer: {
    config: {
      usernameY: 20,
    },
    socket,
    otherPlayers: new Map()
  },
  hud: {
    inventory: false
  },
  pokemon: {
    zone: {
      rate: 10// 10/100 → 1 chance sur 10
    },
    encounter: {
      last: -1
    }
  },
  settings: {
    timeout: {
      start: 500,
      menuSwitch: 50
    },
    speed: {
      walk: 150,
      run: 100
    },
    game: {
      width: sizeChunck * sizePixelTile,
      height: sizeChunck * sizePixelTile
    },
    world: {
      sizeChunck,
      sizePixelTile,
      sizePixelChunck: sizeChunck * sizePixelTile,
    },
    player: {
      collision: true,
      width: 32,
      height: 32,
      scale:1.4,
      yCorrection: 10,
      xCorrection: 4,
      skins: 22
    },
    tilesProperties: {
      collision: 'collision',
      grass: 'grass',
      water: 'water',
      stair: 'stair'
    }
  }
};

export { client };