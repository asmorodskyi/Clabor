export default class Player {
    constructor(scene, name, x, y, position) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.cards = [];
        this.render = () => {
            let labelX = this.x;
            let labelY = this.y;
            if (position === 'top') {
                labelY += 100;
            } else {
                labelY -= 100;
            }
            this.player = scene.add.text(labelX, labelY, [this.name]).setFontSize(15).setFontFamily('Trebuchet MS').setColor('#00ffff');
            for (let i = 0; i < this.cards.length; i++) {
                let cardX = this.x;
                let cardY = this.y;
                if (position === 'bottom' || position === 'top') {
                    cardX += i * 100;
                } else {
                    cardY += i * 100;
                }
                this.cards[i].render(cardX, cardY);
            }
            return this.player;
        };
    }
}