const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

let players = [];

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
      players.push({id: socket.id, name: arg});
      socket.emit("REGISTERED", arg);
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
