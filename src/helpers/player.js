import Card from '../helpers/card';
export default class Player {
    constructor(scene, data, type) {
        this.name = data.name;
        this.type = type;
        this.cards = [];
        for (let i = 0; i < data.cards.length; i++) {
            this.cards.push(new Card(scene, data.cards[i]));
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