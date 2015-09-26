var app = require('express')();
var server = require('http').Server(app);
// Calling the function then requiring the socket.io from the www file. 
// Our server side object of socket.io
var io = require('socket.io')(server); 

// have io listen to port 3000
io.on = require('socket.io')(server);
// have the server listen to port 3000

// configuring the middleware
io.use(function(socket, next) {

  next(null, true);
});

io.on('connection', function(socket) {
  socket.on('join', function(roomData) { // join() method handles joining rooms
    socket.join(roomData.roomName); 
  })

  socket.on('leave', function(roomData) {
    socket.leave(roomData.roomName); // leave() method handles leaving the room
  }) // both take roomName as an argument

});

io.on('connection', function(socket) {
  io.in('messageRoom').emit( ub8h)
})

io.on('connection', function(socket) {

  // adding event handlers to socket.on disconnect event
  socket.on('disconnect', function() {
    console.log('user has disconnected'); 
  });
});

server.listen(3000);

// able to have io to be attached to the server
module.exports = io; 