class TextAssets {
  /**
   * @param {Phaser.Scene} scene 
   */
  constructor(scene) {
    this.scene = scene;
  };

  wrapText(text, pixelsPerCharacter=5, maxWidth=314) {
    const charactersPerLine = Math.floor(maxWidth / pixelsPerCharacter);

    const words = text.split(' ');
    let currentLine = '';
    let wrappedText = '';

    for (let i = 0; i < words.length; i++) {
      let testLine = currentLine + words[i] + ' ';

      if (testLine.length > charactersPerLine && i > 0) {
        wrappedText += currentLine + '\n';
        currentLine = words[i] + ' ';
      } else {
        currentLine = testLine;
      }
    }

    wrappedText += currentLine;
    return wrappedText.trim();
  };
};

export { TextAssets };