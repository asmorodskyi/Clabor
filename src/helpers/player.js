export default class Player {
    constructor(scene, name, type) {
        this.name = name;
        this.cards = [];
        if (type === 'me') {
            this.position = 'bottom';
            this.x = 475;
            this.y = 800;
        }   else if (type === 'partner') {
            this.position = 'top';
            this.x = 475;
            this.y = 100;
        }  else if (type === 'opponent1') {
            this.position = 'left';
            this.x = 75;
            this.y = 250;
        } else if (type === 'opponent2') {
            this.position = 'right';
            this.x = 1425;
            this.y = 250;
        }
        for(let j = 0; j < 5; j++) {
            let randomCard = Phaser.Math.RND.pick(scene.cards);
            scene.cards.splice(scene.cards.indexOf(randomCard), 1);
            this.cards.push(randomCard);
        }
        this.render = () => {
            let labelX = this.x;
            let labelY = this.y;
            if (this.position === 'top') {
                labelY += 100;
            } else {
                labelY -= 100;
            }
            this.player = scene.add.text(labelX, labelY, [this.name]).setFontSize(15).setFontFamily('Trebuchet MS').setColor('#00ffff');
            for (let i = 0; i < this.cards.length; i++) {
                let cardX = this.x;
                let cardY = this.y;
                if (this.position === 'bottom' || this.position === 'top') {
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