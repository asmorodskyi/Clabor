export default class Card {
    constructor(scene, alias) {
        this.alias = alias;
        this.filename = `${this.alias}.png`;
        this.render = (x, y) => {
            this.card = scene.add.image(x, y, this.alias);
            this.card.setScale(0.2, 0.2).setInteractive()
            this.card.on("pointerdown", this.clickHandler);
            return this.card;
        };
    }

    clickHandler() {
        this.y = 350;
    }
}