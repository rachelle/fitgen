module.exports = function(io, socket) {
  io.emit('chatMessage', {  // emitting the chat message
    type:     'status', // passing the chat message to an  object
    text:     'connected', // to inform all the connected clients
    created:  'Date.now()', 
    username: 'socket.request.user.username', 
  });

  // event handler for messages sent from the client
  socket.on('chatMessage', function(message) { 
    message.type      = 'message'; // add the message
    message.created   = Date.now(); // message type time
    message.username  = socket.request.user.username; // modified message object
    // connected socket clients using the io.emit() method
    io.emit('chatMessage', message);
  
  }); 

  // handling disconnecting from the system event
  socket.on('disconnect', function() { 
    // notify the users when disconnected
    io.emit('chatMessage', { // notify all connected clients
    type:     'status', 
    text:     'disconnected', 
    created:  Date.now(), // time users disconnect from chat
    username: socket.request.user.username
    });
  });
};