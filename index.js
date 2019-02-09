var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(process.end.PORT||4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket
var io = socket(server);
io.on('connection',(socket) => {
  console.log('maid io connect',socket.id);
  socket.on('ball',function(data){
    io.sockets.emit('connector',data);
  })
})
