export default class Card {
    constructor(scene, value, suit) {
        this.value = value;
        this.suit = suit;
        this.alias = `${value}_of_${suit}`;
        this.filename = `${this.alias}.png`;
        this.render = (x, y) => {
            this.card = scene.add.image(x, y, this.alias);
            this.card.setScale(0.3, 0.3).setInteractive()
            this.card.on("pointerdown", this.clickHandler);
            return this.card;
        };
    }

    clickHandler() {
        this.y = 350;
    }
}