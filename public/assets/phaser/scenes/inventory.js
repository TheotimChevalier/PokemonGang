import { client, CreateKeyboard, CreateLayer, HUDItems, TextAssets } from '../utils/index.js';

const defaultItemY = 105;

class InventoryScene extends Phaser.Scene {
  constructor() {
    super({key: client.scenes.key.inventory, active:true});
    this.layer = {};
    this.lastUpdateTime = 0;
    this.updateInterval = 100;

    //item dans hud
    this.itemsJson = {};
    this.selectItem = {};
    
    //l'item en bas description
    this.spriteItemSelect = {};
    this.spriteItemName = {};
    this.spriteItemDescription = {};
    
    //hud pokedollar 
    this.pokedollarText = {};
    
    //nav bar
    this.textNavBar = {};
    
    this.navBarLabels = ['Poche Soins', 'Poche Poké Balls', 'Poche Objets de combat', 'Poche Baies', 'Poche Objets', 'Poche CT', 'Poche Trésors', 'Poche Objets rares'];
    this.navBarFilter = [2, 1, 3, 7, 5, 8, 7, 6];
    
    this.itemPosition = {
      x: 20,
      y: defaultItemY,
      index: 0,
      navBarIndex: 0
    };

    this.createKeyboard = new CreateKeyboard(this);
    this.createLayer = new CreateLayer(this);
    this.hudItems = new HUDItems(this);
    this.textAssets = new TextAssets(this);
  };

  async preload() {
    console.log(this.scene.key);
    client.scenes.currentKey = this.scene.key;

    //this.createKeyboard.inventory();
    this.createLayer.inventory();
  };
  
  create() {
    console.log('Create hud') 
  };

  update(time, delta) {
    if (client.hud.inventory && time - this.lastUpdateTime >= this.updateInterval) this.hudItems.move(time);
  };

  async showHUD() {
    if(!client.hud.inventory) {
      client.hud.inventory = true;
      client.player.freeze = true;

      this.itemsJson = await this.hudItems.getItems();

      this.hudItems.create();
      this.hudItems.update();
    } else {
      client.hud.inventory = false;
      client.player.freeze = false;
      this.layer.background.removeAll(true);
      this.layer.items.removeAll(true);
      this.layer.top.removeAll(true);
      this.layer.navBarBlip.removeAll(true);
      this.layer.pokedollar.removeAll(true);

    }
  };
};

export default InventoryScene;