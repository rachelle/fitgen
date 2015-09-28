var mainApplicationModuleName = 'mean'; 

var mainApplicationModuleName = angular.module(mainApplicationModuleName, 
  ['ngResource', 'ngRoute', 'users', 'example', 'articles', 'chat']);

  mainApplicationModuleName.config(['$locationProvider', 
    function($locationProvider) {
      $locationProvider.hashPrefix('!'); 
    }
 }); 

  if (window.location.hash === '#_=_') window.location.hash = '#!'; 

  angular.element(document).ready(function) {
  angular.bootstrap(document, [mainApplicationModuleName]); 
 }); 

