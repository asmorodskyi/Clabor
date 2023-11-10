import Card from '../helpers/card';
import Player from '../helpers/player';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
        this.config = {
            players: [new Player(this, 'Player 1', 475, 800, 'bottom'),
                      new Player(this, 'Player 2', 75, 250, 'left'),
                      new Player(this, 'Player 3', 475, 100, 'top'),
                      new Player(this, 'Player 4', 1425, 250, 'right')],
         };
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
            this.load.image(this.cards[i].alias, this.cards[i].filename);
        }

    }

    create() {
        let self = this;

        for(let i = 0; i < self.config.players.length; i++) {
            for(let j = 0; j < 5; j++) {
                let randomCard = Phaser.Math.RND.pick(self.cards);
                self.cards.splice(self.cards.indexOf(randomCard), 1);
                self.config.players[i].cards.push(randomCard);
            }
            self.config.players[i].render();
        }
    }

    update() {

    }
}