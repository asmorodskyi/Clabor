import Card from '../helpers/card';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.setPath('assets/');
        this.cards = [
            new Card(this, '10', 'clubs'),
            new Card(this, '7', 'clubs'),
            new Card(this, '8', 'clubs'),
            new Card(this, '9', 'clubs'),
            new Card(this, 'ace', 'clubs'),
            new Card(this, 'jack', 'clubs'),
            new Card(this, 'king', 'clubs'),
            new Card(this, 'queen', 'clubs'),
            new Card(this, '10', 'diamonds'),
            new Card(this, '7', 'diamonds'),
            new Card(this, '8', 'diamonds'),
            new Card(this, '9', 'diamonds'),
            new Card(this, 'ace', 'diamonds'),
            new Card(this, 'jack', 'diamonds'),
            new Card(this, 'king', 'diamonds'),
            new Card(this, 'queen', 'diamonds'),
            new Card(this, '10', 'hearts'),
            new Card(this, '7', 'hearts'),
            new Card(this, '8', 'hearts'),
            new Card(this, '9', 'hearts'),
            new Card(this, 'ace', 'hearts'),
            new Card(this, 'jack', 'hearts'),
            new Card(this, 'king', 'hearts'),
            new Card(this, 'queen', 'hearts'),
            new Card(this, '10', 'spades'),
            new Card(this, '7', 'spades'),
            new Card(this, '8', 'spades'),
            new Card(this, '9', 'spades'),
            new Card(this, 'ace', 'spades'),
            new Card(this, 'jack', 'spades'),
            new Card(this, 'king', 'spades'),
            new Card(this, 'queen', 'spades')
        ]

        for (let i = 0; i < this.cards.length; i++) {
            this.load.image(this.cards[i].sprite, this.cards[i].filename);
        }

    }

    create() {
        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        let self = this;


		this.dealCards = () => {
        	for (let i = 0; i < 5; i++) {
                this.cards[i].render(475 + (i * 100), 650);
            }
    	}

		this.dealText.on('pointerdown', function () {
            self.dealCards();
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
    }

    update() {

    }
}