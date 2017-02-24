var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate','ngTable']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'List questions',
      templateUrl: 'html/questions/question.html',
      controller: 'questionCtrl',
    })
    .when('/addQuestion',{
      templateUrl: 'html/test.html',
      templateUrl: 'html/questions/add_question.html',
      controller: 'questionCtrl',
    })
    .when('/categories', {
      title: 'List Category',
      templateUrl: 'html/categories/category.html',
      controller: 'categoryCtrl',
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
