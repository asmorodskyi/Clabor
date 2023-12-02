const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

let players = [];
let cards_heap = [
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

function getPlayerNameById(id) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === id) {
      return players[i].name;
    }
  }
  return null;
}

function deletePlayerById(id) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === id) {
      players.splice(i, 1);
    }
  }
}

io.on('connection', function (socket) {
  socket.on("REGISTER", (arg) => {
    if (players.length === 4) {
      console.log('Game is full');
      socket.emit("DENY");
    }
    else {
      console.log('Regestring user ' + arg);
      let playerCards = [];
      for(let j = 0; j < 5; j++) {
        let randomCard = cards_heap[(Math.floor(Math.random() * cards_heap.length))];
        cards_heap.splice(cards_heap.indexOf(randomCard), 1);
        playerCards.push(randomCard);
      }
      let new_player = {id: socket.id, name: arg, cards: playerCards};
      players.push(new_player);
      socket.emit("REGISTERED", new_player);
    }
  });
  socket.on("GET_STATE", () => {
    socket.emit("APPLY_STATE", players);
  });

  socket.on('disconnect', function () {
    playerName = getPlayerNameById(socket.id);
    if(playerName !== null) {
      console.log(playerName + ' user disconnected');
      deletePlayerById(socket.id);
    }
  });
});

http.listen(3000, function () {
    console.log('Server started!');
});
