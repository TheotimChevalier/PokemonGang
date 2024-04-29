import { client } from '../index.js';

const sizeItems = 37;
const defaultItemY = 105;

class HUDItems {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene
  };

  async create() {
    const backgroundHud = this.scene.add.sprite(0, 0, 'hud_items_menu', 0).setOrigin(0, 0);
    const topHud = this.scene.add.sprite(0, 0, 'hud_items_menu', 1).setOrigin(0, 0);

    this.scene.layer.background.add(backgroundHud);
    this.scene.layer.top.add(topHud);
    
    this.scene.textNavBar = this.scene.add.text(this.scene.game.config.width / 2 + 40, 70, this.scene.navBarLabels[this.scene.itemPosition.navBarIndex], {
      fontFamily: 'W95FA',
      color: '#ffffff'
    }).setOrigin(0.5, 0);
    this.scene.layer.top.add(this.scene.textNavBar);

    let xNavBarBlip = 120;
    this.scene.navBarLabels.forEach((value, index) => {
      const frame = index === this.scene.itemPosition.navBarIndex ? index + this.scene.navBarLabels.length : index;
      const spriteBlipNavBar = this.scene.add.sprite(xNavBarBlip, 50, 'hud_nav_bar_blip', frame).setOrigin(0, 0);
      this.scene.layer.navBarBlip.add(spriteBlipNavBar)
      xNavBarBlip += 25
    });

    this.scene.pokedollarText = this.scene.add.text(345, 3, `₽ ${await this.getPokedollar()}`, {
      fontFamily: 'W95FA',
      color: '#000000',
      fontSize: 32,
    }).setOrigin(1, 0);

    this.scene.layer.pokedollar.add(this.scene.pokedollarText);
  };

  update() {
    this.scene.layer.items.y = 0;

    this.scene.itemPosition.y = defaultItemY;
    this.scene.itemPosition.index = 0;
  
    const filterItems = this.scene.itemsJson.items.filter(i => i.type === this.scene.navBarFilter[this.scene.itemPosition.navBarIndex]);
  
    if(filterItems.length) { 
      this.scene.selectItem = this.scene.add.sprite(0, 0, 'hud_items_menu', 2).setOrigin(0, 0);
      this.scene.layer.top.add(this.scene.selectItem);
  
      this.scene.spriteItemSelect = this.scene.add.sprite(this.scene.itemPosition.x, 288, 'items_spritesheet', filterItems[0].spritesheet).setOrigin(0, 0).setScale(0.66);
      this.scene.spriteItemName = this.scene.add.text(this.scene.itemPosition.x + 40, 290, filterItems[0].name, {
        fontFamily: 'W95FA',
        color: '#000000',
        fontSize: 13
      }).setOrigin(0, 0);
      
      const wrappedText = this.scene.textAssets.wrapText(filterItems[0].description);
  
      this.scene.spriteItemDescription = this.scene.add.text(this.scene.itemPosition.x, 312, wrappedText, {
        fontFamily: 'W95FA',
        color: '#000000',
        fontSize: 13,
      }).setOrigin(0, 0);

      this.scene.layer.top.add(this.scene.spriteItemSelect);
      this.scene.layer.top.add(this.scene.spriteItemName);
      this.scene.layer.top.add(this.scene.spriteItemDescription);
    };
  
    filterItems.forEach(i => {
      const item = this.scene.add.sprite(this.scene.itemPosition.x, this.scene.itemPosition.y, 'items_spritesheet', i.spritesheet).setOrigin(0, 0);
      const nameItem = this.scene.add.text(this.scene.itemPosition.x + 40, this.scene.itemPosition.y + 7, i.name, {
        fontFamily: 'W95FA',
        color: '#000000'
      }).setOrigin(0);
  
      const valueX = this.scene.add.text(this.scene.itemPosition.x + 260, this.scene.itemPosition.y + 7, 'x', {
        fontFamily: 'W95FA',
        color: '#000000'
      }).setOrigin(0)
  
      const value = this.scene.add.text(this.scene.itemPosition.x + 310, this.scene.itemPosition.y + 7, i.value.toString(), {
        fontFamily: 'W95FA',
        color: '#000000'
      }).setOrigin(1, 0)
  
      this.scene.layer.items.add([item, nameItem, valueX, value])
      this.scene.itemPosition.y += sizeItems;
    });
  };

  async getItems() {
    const response = await fetch('/api/game/inventory/get-items');
    return await response.json();
  };

  async getPokedollar() {
    const response = await fetch('/api/game/inventory/get-pokedollar');
    const data = await response.json();
    return await data.pokedollar;
  };

  move(time) {
    const keys = client.keys.keys;
    const upKey = keys.up.isDown;
    const downKey = keys.down.isDown;
    const rightKey = keys.right.isDown;
    const leftKey = keys.left.isDown;

    
    
    if(upKey || downKey) {
      const filterItems = this.scene.itemsJson.items.filter(i => i.type === this.scene.navBarFilter[this.scene.itemPosition.navBarIndex]);
      const totalItems = filterItems.length
      if(downKey) {
        this.scene.itemPosition.index = (this.scene.itemPosition.index + 1) % totalItems;
      } else {
        this.scene.itemPosition.index = (this.scene.itemPosition.index - 1 + totalItems) % totalItems;
      };

      this.scene.tweens.add({
        targets: this.scene.layer.items,
        y: this.scene.itemPosition.index * -sizeItems,
        duration: this.scene.updateInterval,
        ease: 'Linear'
      });

      const selectedItem = filterItems[this.scene.itemPosition.index]
      if(selectedItem) {
        this.scene.spriteItemSelect.setFrame(selectedItem.spritesheet);
        this.scene.spriteItemName.setText(selectedItem.name);
        const wrappedText = this.scene.textAssets.wrapText(selectedItem.description)
        this.scene.spriteItemDescription.setText(wrappedText)
      };

      this.scene.lastUpdateTime = time;
    } else if(rightKey || leftKey) {
      const filterItems = this.scene.itemsJson.items.filter(i => i.type === this.scene.navBarFilter[this.scene.itemPosition.navBarIndex]);
      let previousIndex = this.scene.itemPosition.navBarIndex;
      if(rightKey) {
        this.scene.itemPosition.navBarIndex = (this.scene.itemPosition.navBarIndex + 1) % this.scene.navBarLabels.length;
      } else {
        this.scene.itemPosition.navBarIndex = (this.scene.itemPosition.navBarIndex - 1 + this.scene.navBarLabels.length) % this.scene.navBarLabels.length;
      };

      const ongletSelected = this.scene.layer.navBarBlip.list[this.scene.itemPosition.navBarIndex];
      const beforeOngletSelected = this.scene.layer.navBarBlip.list[previousIndex];
      const navBarLabel = this.scene.navBarLabels[this.scene.itemPosition.navBarIndex];

      if(ongletSelected) ongletSelected.setFrame(this.scene.itemPosition.navBarIndex + this.scene.navBarLabels.length);
      if(beforeOngletSelected) beforeOngletSelected.setFrame(previousIndex);
      if(navBarLabel) this.scene.textNavBar.setText(navBarLabel);

      this.scene.layer.items.removeAll(true);
      if(filterItems.length) {
        this.scene.selectItem.destroy();
        this.scene.spriteItemName.destroy();
        this.scene.spriteItemSelect.destroy();
        this.scene.spriteItemDescription.destroy();
        this.scene.selectItem.destroy();
      }
      this.update();

      this.scene.lastUpdateTime = time;
    } else {

    };
  };
};

export { HUDItems }