import io from 'socket.io-client';
import Card from '../helpers/card';
import Player from '../helpers/player';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
        this.config = {
            server_url: 'http://localhost:3000',
         };
         this.playersDeck = [
            {type: 'me', position: 'bottom', x: 475, y: 800},
            {type: 'partner', position: 'top', x: 475, y: 100},
            {type: 'opponent1', position: 'left', x: 75, y: 250},
            {type: 'opponent2', position: 'right', x: 1425, y: 250}
        ];

        this.playersName = [];

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
        ];
    }

    preload() {
        this.load.setPath('assets/');
        this.load.html('nameform', 'nameform.html');
        for (let i = 0; i < this.playersDeck.length; i++) {
            let labelX = this.playersDeck[i].x;
            let labelY = this.playersDeck[i].y;
            if (this.playersDeck[i].position === 'top') {
                labelY += 100;
            } else {
                labelY -= 100;
            }
            let labelText = this.add.text(labelX, labelY, '', {
                fontFamily: 'Trebuchet MS',
                fontSize: 15,
                color: '#00ffff'
            });
            this.playersName.push({type: this.playersDeck[i].type, label: labelText});
        }
        this.centerTextField = this.add.text(400, 300, '', {
            fontFamily: 'Trebuchet MS',
                fontSize: 15,
                color: '#00ffff'
            });
        for (let i = 0; i < this.cards.length; i++) {
            this.load.image(this.cards[i].alias, this.cards[i].filename);
        }
    }

    create() {
        let self = this;
        self.socket = io(self.config.server_url);

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
                    self.socket.emit("REGISTER", inputText.value);
                }
            }

        });
        self.socket.on("REGISTERED", function (playerName) {
            self.myPlayer = new Player(self, playerName, 'me');
            self.myPlayer.render();
        });
        self.socket.on("DENY", function () {
            self.centerTextField.setText('Game is full');
        });
        self.socket.on("APPLY_STATE", function (state) {
            let player_str = '';
            for (let i = 0; i < state.length; i++) {
                player_str += state[i].name + '\n';
            }
            self.centerTextField.setText(player_str);
        });
        this.tweens.add({
            targets: nameform,
            y: 300,
            x: 400,
            duration: 100,
            ease: 'Power3'
        });

    }

    update() {
        if (this.socket) {
            this.socket.emit("GET_STATE");
        }
    }
}