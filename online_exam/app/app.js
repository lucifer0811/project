var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate','ngTable', 'ngCookies']);

app.$inject = ['$routeProvider', '$locationProvider'];
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider) {
    $routeProvider.
    when('/home', {
      title: 'List questions',
      templateUrl: 'html/questions/question.html',
      controller: 'questionCtrl',
    })
    .when('/register', {
      controller: 'RegisterController',
      templateUrl: 'html/login/register.html',
      controllerAs: 'vm',
    })
    .when('/login', {
      controller: 'LoginController',
      templateUrl: 'html/login/login.html',
      controllerAs: 'vm',
    })
    .when('/question/add', {
      title: 'Add questions',
      templateUrl: 'html/questions/questionNew.html',
      controller: 'addQuestionCtrl',
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
    .when('/examies/:id/sections',{
      title: "Exam",
      templateUrl: 'html/sections/section.html',
      controller: 'sectionCtrl',
    })
    .when('/examies/:id/show',{
      title: "Exam",
      templateUrl: 'html/examies/detail.html',
      controller: 'detailExamCtrl',
    })
    .when('/section_questions', {
      title: "Question in Section",
      controller: 'section_questionCtrl',
    }).
    when('/categories/:id/questions', {
      title: "Question in Category",
      controller: 'section_questionCtrl',
    })
    .otherwise({
      redirectTo: '/home'
    });

    app.run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookies.getObject('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
      });
    }
}]);
