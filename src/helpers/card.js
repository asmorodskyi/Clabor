export default class Card {
    constructor(scene, value, suit) {
        this.value = value;
        this.suit = suit;
        this.sprite = `${value}_of_${suit}`;
        this.filename = `${this.sprite}.png`;
        this.render = (x, y) => {
            let card = scene.add.image(x, y, this.sprite).setScale(0.3, 0.3).setInteractive();
            scene.input.setDraggable(card);
            return card;
        }
    }
}