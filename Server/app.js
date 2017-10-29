var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = {};

app.get('/', function(req, res){

  res.sendFile(__dirname + '/index.html');
});

app.use("/public", express.static(__dirname + '/public'))


io.on('connection', function(socket){
  socket.on('new player', function(player){
    players[socket.id] = {
      name: player
    };
  });
  socket.on('player update', function (playerUpdate) {
    if (players[socket.id] !== undefined) {
      players[socket.id].x = playerUpdate.x;
      players[socket.id].y = playerUpdate.y;
      console.log(playerUpdate.x);
      console.log(socket.id);
    }
  })
  socket.on('disconnect', function(){
    players[socket.id] = undefined;
    //players[this.playerIndex].dead = true;
    console.log('user disconnected');
  });
  console.log('a user connected' + socket.id);
});


function gameloop() {
  io.emit('game update', players);
};
var timer = setInterval(gameloop, 200);

http.listen(3001, function(){
  console.log('listening on *:3001');
});
