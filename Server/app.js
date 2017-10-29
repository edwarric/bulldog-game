players[i].sizevar express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = [];
var enemyHeight = 50; // enemies
var enemyWidth = 30;
var enemyX = 300;
var enemyY = 225;
var dx = 0;
var dy = -2;
var level= 1;

app.get('/', function(req, res){

  res.sendFile(__dirname + '/index.html');
});

app.use("/public", express.static(__dirname + '/public'))


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
function manageEnemy(){
  enemyX += dx;
  enemyY += dy * level;
  //check if a player got killed
  for (var i = 0; i < players.length; i++){
    if (players[i].x + players[i].size >= enemyX && players[i].x + playerWidth <= enemyX + enemyWidth){
      if (players[i].y + players[i].size >= enemyY && players[i].y + players[i].size <= enemyY + enemyHeight){
          players[i].isAlive = false
      }
      else if (players[i].y >= enemyY && players[i].y <= enemyY + enemyHeight){
          players[i].isAlive = false
      }
    }
    else if (players[i].x >= enemyX && players[i].x <= enemyX + enemyWidth){
      if (players[i].y + players[i].size >= enemyY && players[i].y + players[i].size <= enemyY + enemyHeight){
          players[i].isAlive = false
      }
      else if (players[i].y >= enemyY && players[i].y <= enemyY + enemyHeight){
          players[i].isAlive = false
      }
    }
  }
}
(function gameloop() {
  var timer = setInterval(gameloop, 100);
  io.emit('game update', players);
})();

http.listen(3001, function(){
  console.log('listening on *:3001');
});
