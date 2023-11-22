export default class Player {
    constructor(scene, name, type) {
        this.name = name;
        this.type = type;
        this.cards = [];
        for(let j = 0; j < 5; j++) {
            let randomCard = Phaser.Math.RND.pick(scene.cards);
            scene.cards.splice(scene.cards.indexOf(randomCard), 1);
            this.cards.push(randomCard);
        }
        this.render = () => {
            for (let i = 0; i < scene.playersName.length; i++) {
                if (scene.playersName[i].type === this.type) {
                    scene.playersName[i].label.setText(this.name);
                    break;
                }
            }
            for (let i = 0; i < this.cards.length; i++) {
                let cardX = 0;
                let cardY = 0;
                let position = '';
                for (let j = 0; j < scene.playersDeck.length; j++) {
                    if (scene.playersDeck[j].type === this.type) {
                        cardX = scene.playersDeck[j].x;
                        cardY = scene.playersDeck[j].y;
                        position = scene.playersDeck[j].position;
                        break;
                    }
                }
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