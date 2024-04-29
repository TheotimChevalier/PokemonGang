import { client } from '../index.js';

class RegisterWorld {
  constructor(name, index, chunckSizeX, chunckSizeY, door, /*stairs*/) {
    this.path = '../../assets/level/world/' + name + '.json';
    this.name = name;
    this.index = index;
    this.chunckSizeX = chunckSizeX;    
    this.chunckSizeY = chunckSizeY;    
    this.door = door;
    //this.stairs = stairs;
  };

  create() {
    return client.world.worlds.set(this.index,{
      name: this.name,
      totalCaseX: this.chunckSizeX * client.settings.world.sizeChunck,
      totalCaseY: this.chunckSizeY * client.settings.world.sizeChunck,
      index: this.index,
      path: this.path,
      chunckSizeX: this.chunckSizeX,
      chunckSizeY: this.chunckSizeY,
      leftX: -this.chunckSizeX,
      rightX: client.settings.world.sizePixelChunck * this.chunckSizeX,
      topX: -this.chunckSizeY,
      bottomX: client.settings.world.sizePixelChunck * this.chunckSizeY,
      door: this.door,
     
    });
  }
};

new RegisterWorld('quoicoucity',0,4,9,
  [//door
    //maison player
    {case:[[0,13,26]],target:[0,3,70]},
    {case:[[1,3,71],[1,4,71],[1,2,71]],target:[1,13,27]},

    //centre pokemon
    {case:[[0,13,16]],target:[0, 22,70]},
    {case:[[1,21,71],[1,22,71],[1,23,71]],target:[1,13,17]},
  ],

).create();

new RegisterWorld('maincity',1,15,21,[],
).create();

new RegisterWorld('gtaVIbeachbaby', 2, 7, 5, [],
).create();