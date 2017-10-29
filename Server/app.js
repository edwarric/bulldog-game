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
var timeleft = 10;


app.get('/', function(req, res){

  res.sendFile(__dirname + '/index.html');
});

app.use("/public", express.static(__dirname + '/public'))


io.on('connection', function(socket){
  socket.on('new player', function(player){
    players[socket.id] = {
      name: player,
      isAlive : true,
    };
  });
  socket.on('player update', function (playerUpdate) {
    if (players[socket.id] !== undefined) {
      players[socket.id].x = playerUpdate.x;
      players[socket.id].y = playerUpdate.y;

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
    if (player !== undefined) {
      if (player.x + player.Width >= enemyX && player.x + player.Width <= enemyX + enemyWidth){
        if (player.y + player.Height >= enemyY && player.y + player.Height <= enemyY + enemyHeight){
          setPlayerAsDead(player);
        }
        else if (player.y >= enemyY && player.y <= enemyY + enemyHeight){
          setPlayerAsDead(player);
        }
      }
      else if (player.x >= enemyX && player.x <= enemyX + enemyWidth){
        if (player.y + player.Height >= enemyY && player.y + player.Height <= enemyY + enemyHeight){
          setPlayerAsDead(player);
        }
        else if (player.y >= enemyY && player.y <= enemyY + enemyHeight){
          setPlayerAsDead(player);
        }
      }
    }
  }
  checkWin();
}
function checkWin(){
  for (var playerID in players) {
    var player = players[playerID];
    if (player !== undefined) {
      if (player.x >= 575){
        player.hasFinished = true;
        console.log("win");
      }
    }
  }
}
function setPlayerAsDead(player) {
  player.isAlive = false;
  console.log("dead");
}

//IMPLEMENTING TIMER
function timeRemaining(){
  //timeLeft starts at 10
  timeleft -= 1;

  if (timeleft == 0){
    level += 1;
    timeleft = 10;
    io.emit('next level', level);
  }
}
  var secondIncrement = setInterval(timeRemaining, 1000);
  
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
var timer = setInterval(gameloop, 20);

http.listen(3001, function(){
  console.log('listening on *:3001');
});
