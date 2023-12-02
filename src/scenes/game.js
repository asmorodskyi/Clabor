import io from 'socket.io-client';
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
        let all_cards = [
            '10_of_clubs',
            '7_of_clubs',
            '8_of_clubs',
            '9_of_clubs',
            'ace_of_clubs',
            'jack_of_clubs',
            'king_of_clubs',
            'queen_of_clubs',
            '10_of_diamonds',
            '7_of_diamonds',
            '8_of_diamonds',
            '9_of_diamonds',
            'ace_of_diamonds',
            'jack_of_diamonds',
            'king_of_diamonds',
            'queen_of_diamonds',
            '10_of_hearts',
            '7_of_hearts',
            '8_of_hearts',
            '9_of_hearts',
            'ace_of_hearts',
            'jack_of_hearts',
            'king_of_hearts',
            'queen_of_hearts',
            '10_of_spades',
            '7_of_spades',
            '8_of_spades',
            '9_of_spades',
            'ace_of_spades',
            'jack_of_spades',
            'king_of_spades',
            'queen_of_spades'
            ];
        for (let i = 0; i < all_cards.length; i++) {
            this.load.image(all_cards[i], all_cards[i] + '.png');
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
        self.socket.on("REGISTERED", function (data) {
            self.myPlayer = new Player(self, data, 'me');
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