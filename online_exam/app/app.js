var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate','ngTable']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/home', {
      title: 'List questions',
      templateUrl: 'html/questions/question.html',
      controller: 'questionCtrl',
    })
    .when('/categories', {
      title: "List Category",
      templateUrl: 'html/categories/category.html',
      controller: 'categoryCtrl',
    })
    .when('/examies',{
      title: "Exam",
      templateUrl: 'html/examies/exam.html',
      controller: 'examCtrl',
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);
