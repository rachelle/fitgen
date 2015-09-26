var config       = require('./config'); 
var cookieParser = require('cookie-parser');
var passport     = require('passport'); 


// configuring middleware and retrieves session user
module.exports = function(server, io, mongoStore) {
    io.use(function(socket, next) {
      cookieParser(config.sessionSecret)(socket.request, {}, 
function(err) {
    var sessionId = socket.request.signedCookies['connect.sid']; 
    
    mongoStore.get(sessionId, function(err, session) {
      socket.request.session = session; 

      passport.initialize() (socket.request, {}, function() { 
      // populate the session's user object according to the session information
        passport.session() (socket.request, {}, function() {
          if (socket.request.user) { // if user is authenticated
            next(null, true); // connection will open 
          } else { 
            next(new Error('User is not authenticated'), false); // no connection if false
          }
        })
      });
    });
  });
}); 
  
io.on('connection', function(socket) {

  });

};