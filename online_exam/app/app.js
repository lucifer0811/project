var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'List questions',
      templateUrl: 'html/questions/question.html',
      controller: 'questionCtrl'
    })
    when('/categories', {
      title: 'List categories',
      templateUrl: 'html/categoies/category.html',
      controller: 'categoryCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
