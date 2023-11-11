const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

let players = [];

io.on('connection', function (socket) {
  socket.on("REGISTER", (arg) => {
    players.push(arg);
    console.log(players);
    io.emit("REGISTERED", players);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(3000, function () {
    console.log('Server started!');
});
