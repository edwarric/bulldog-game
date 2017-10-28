var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  console.log('a user connected');
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
