var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'List questions',
      templateUrl: 'html/questions.html',
      controller: 'questionCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
    