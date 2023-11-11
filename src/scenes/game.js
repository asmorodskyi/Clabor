import io from 'socket.io-client';
import Card from '../helpers/card';
import Player from '../helpers/player';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
        this.config = {
            players: [],
            server_url: 'http://localhost:3000',
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

        this.load.html('nameform', 'nameform.html');

        for (let i = 0; i < this.cards.length; i++) {
            this.load.image(this.cards[i].alias, this.cards[i].filename);
        }

    }

    create() {
        let self = this;
        this.socket = io(this.config.server_url);

        const nameform = this.add.dom(400, 0).createFromCache('nameform');
        nameform.addListener('click');
        nameform.on('click', function (event)
        {
            if (event.target.name === 'playButton')
            {
                const inputText = this.getChildByName('nameField');
                if (inputText.value !== '')
                {
                    this.removeListener('click');
                    this.setVisible(false);
                    self.myPlayer = new Player(self, inputText.value, 'me');
                    self.myPlayer.render();
                    self.socket.on('connect', function () {
                        self.socket.emit("REGISTER", inputText.value);
                        self.socket.on("REGISTERED", (arg) => {
                            console.log(arg);
                        });
                    });
                }
            }

        });
        this.tweens.add({
            targets: nameform,
            y: 500,
            x: 400,
            duration: 3000,
            ease: 'Power3'
        });

    }

    update() {

    }
}