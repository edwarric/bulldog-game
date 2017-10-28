var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var player;
  socket.on('new player', function(player){
    players.push(player);
    this.player = player;
    console.log('message: ' + player.name);
  });
  socket.on('disconnect', function(){
    for (var i = 0; i < players.length; i++) {
      if (players[i].name === this.player.name) {
        players.splice(i, 1);
        console.log('removed player from game');
        i--;
      }
    }
    console.log('user disconnected');
  });
  console.log('a user connected');
});

(function gameloop() {
  var timer = setInterval(gameloop, 10000);
  io.emit('game update', players);
})();

http.listen(3001, function(){
  console.log('listening on *:3001');
});
