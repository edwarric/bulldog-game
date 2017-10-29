var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = {};
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


function manageEnemy(){
  if(enemyX + dx > 600 - enemyWidth || enemyX + dx < 1) {
      dx = -dx;
  }
  if(enemyY + dy  + enemyHeight > 450 || enemyY + dy < 1) {
      dy = -dy;
  }
  enemyX += dx;
  enemyY += dy * level;

  //check if a player got killed
  for (var playerID in players) {
    var player = players[playerID];
    if (player.x + player.Width >= enemyX && player.x + player.Width <= enemyX + enemyWidth){
      if (player.y + player.Height >= enemyY && player.y + player.Height <= enemyY + enemyHeight){
          player.isAlive = false
      }
      else if (player.y >= enemyY && player.y <= enemyY + enemyHeight){
          player.isAlive = false
      }
    }
    else if (player.x >= enemyX && player.x <= enemyX + enemyWidth){
      if (player.y + player.Height >= enemyY && player.y + player.Height <= enemyY + enemyHeight){
          player.isAlive = false
      }
      else if (player.y >= enemyY && player.y <= enemyY + enemyHeight){
          player.isAlive = false
      }
    }
  }
}

function gameloop() {
  manageEnemy();
  var update = {
    players: players,
    enemy: {
      x: enemyX,
      y: enemyY,
      height: enemyHeight,
      width: enemyWidth,
    }
  }
  io.emit('game update', update);


};
var timer = setInterval(gameloop, 200);

http.listen(3001, function(){
  console.log('listening on *:3001');
});
