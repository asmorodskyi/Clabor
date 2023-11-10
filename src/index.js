import Phaser from "phaser";
import Game from "./scenes/game";

const config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    parent: "phaser-example",
    width: 1500,
    height: 900,
    scene: [
        Game
    ]
};

const game = new Phaser.Game(config);