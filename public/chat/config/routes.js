angular.module('chat').config(['$routeProvider', 
  // presenting the view adding a new route
  function($routeProvider {
    $routeProvider.
    when('/chat', {
      templateUrl: 'chat/views/chat.client.view.html'
    });
  }

});