
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var enemySize = 20;
var enemyX = canvas.width/2;
var enemyY = canvas.height-30;
var dx = 0;
var dy = -2
var level = 1;
//player 1
var playerHeight = 20;
var playerWidth = 20;
var playerX = 100;
var playerY = 120;
var spawndiff = 30;
//player 2
var player2Height = 20;
var player2Width = 20;
var player2X = 100;
var player2Y = 150
//Motion
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var right2Pressed = false;
var left2Pressed = false;
var down2Pressed = false;
var up2Pressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//PLAYER 1
function keyDownHandler(e) {
    if(e.keyCode == 39 ) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 40) {
      downPressed = true;
    }
    //PLAYER 2

    else if(e.keyCode == 68 ) {
      right2Pressed = true;
    }
    else if(e.keyCode == 65) {
      left2Pressed = true;
    }
    else if(e.keyCode == 87) {
      up2Pressed = true;
    }
    else if(e.keyCode == 83) {
      down2Pressed = true;
    }

}
function keyUpHandler(e) {
  //PlAYER1
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
  //PLAYER2
    if(e.keyCode == 68) {
        right2Pressed = false;
    }
    else if(e.keyCode == 65) {
        left2Pressed = false;
    }
    else if(e.keyCode == 87) {
        up2Pressed = false;
    }
    else if(e.keyCode == 83) {
        down2Pressed = false;
    }
}

function drawEnemy(n) {
    ctx.beginPath();
    ctx.rect(enemyX, enemyY+(2*n*enemySize), enemySize, enemySize);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}
function drawplayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawplayer2() {
    ctx.beginPath();
    ctx.rect(player2X, player2Y, player2Width, player2Height);
    ctx.fillStyle = "#0035DD";
    ctx.fill();
    ctx.closePath();
}
//SCORE
var count = 0;
var count2 = 0;
function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEnemy(0);
    drawplayer();
    drawplayer2();

    if(enemyX + dx > canvas.width-enemySize || enemyX + dx < enemySize) {
        dx = -dx;
    }
    if(enemyY + dy > canvas.height-enemySize || enemyY + dy < enemySize) {
        dy = -dy;
    }
  //Player1
    if(rightPressed && playerX < canvas.width-playerWidth) {
        playerX += 3;
    }
    else if(leftPressed && playerX > 0) {
        playerX -= 3;
    }
    else if(upPressed && playerY > 0 ) {
        playerY -= 3;
    }
    else if(downPressed && playerY < canvas.height-playerHeight) {
        playerY += 3;
    }
//PLAYER 2
    if(right2Pressed && player2X < canvas.width-player2Width) {
        player2X += 3;
    }
    else if(left2Pressed && player2X > 0) {
        player2X -= 3;
    }
    else if(up2Pressed && player2Y > 0 ) {
        player2Y -= 3;
    }
    else if(down2Pressed && player2Y < canvas.height-player2Height) {
        player2Y += 3;
    }

//RESET AND PLAYER EARNS POINT
    if (playerX > 575) {
      count += 1;
      reset(1);
      reset(2);
      if (level < 6){
        level += 1;
      }
      else {
        level += 0.5;
      }

    }
    if (player2X > 575) {
      count2 += 1;
      reset(1);
      reset(2);
      if (level < 6){
        level += 1;
      }
      else {
        level += 0.5;
      }
    }
//COLLISION WITH BALL PLAYER 1
    if (playerX + playerWidth >= enemyX && playerX + playerWidth <= enemyX + enemySize){
      if (playerY + playerHeight >= enemyY && playerY + playerHeight <= enemyY + enemySize){
          reset(1);
      }
      else if (playerY >= enemyY && playerY <= enemyY + enemySize){
        reset(1);
      }
    }
    else if (playerX >= enemyX && playerX <= enemyX + enemySize){
      if (playerY + playerHeight >= enemyY && playerY + playerHeight <= enemyY + enemySize){
          reset(1);
      }
      else if (playerY >= enemyY && playerY <= enemyY + enemySize){
        reset(1);
      }
    }
//COLLISION WITH BALL PLAYER 2
    if (player2X + player2Width >= enemyX && player2X + player2Width <= enemyX + enemySize){
      if (player2Y + player2Height >= enemyY && player2Y + player2Height <= enemyY + enemySize){
          reset(2);
      }
      else if (player2Y >= enemyY && player2Y <= enemyY + enemySize){
        reset(2);
      }
    }
    else if (player2X >= enemyX && player2X <= enemyX + enemySize){
      if (player2Y + player2Height >= enemyY && player2Y + player2Height <= enemyY + enemySize){
          reset(2);
      }
      else if (player2Y >= enemyY && player2Y <= enemyY + enemySize){
        reset(2);
      }
    }

function reset(playerID){
    if (playerID == 1) {
      playerX = 100;
      playerY = 120;
    }
    else if (playerID == 2){

      player2X = 100;
      player2Y = 120 + spawndiff * playerID;

    }
}

    enemyX += dx;
    enemyY += dy * level;
}

setInterval(main, 10);
