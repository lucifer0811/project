'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('questions', {
                url: '/questions',
                controller: 'questionCtrl',
                templateUrl: 'templates/questions/question.html'
            })
            .state('edit', {
                url: '/questions/edit/:id',
                controller: 'editQuestionCtrl',
                templateUrl: 'templates/questions/questionEdit.html'
            })
            .state('add', {
              url: '/questions/add',
              controller: 'addQuestionCtrl',
              templateUrl: 'templates/questions/questionNew.html'
            })
            .state('categories', {
              url: '/categories',
              controller: 'categoryCtrl',
              templateUrl: 'templates/categories/category.html'
            })
            .state('examies', {
              url: '/examies',
              controller: 'examCtrl',
              templateUrl: 'templates/examies/exam.html'
            })
            .state('section', {
              url: '/examies/:id/sections',
              controller: 'sectionCtrl',
              templateUrl: 'templates/sections/section.html'
            })
            .state('section question', {
              url: '/section_questions',
              controller: 'section_questionCtrl'
            })
            .state('show', {
              url: '/examies/:id/show',
              controller: 'detailExamCtrl',
              templateUrl: 'templates/examies/detail.html'
            })
            .state('Question in Category', {
              url: '/categories/:id/questions',
              controller: 'section_questionCtrl'
            })
            .state('signup', {
              url: '/signup',
              controller: 'signupCtrl',
              templateUrl: 'templates/user/signup.html'
            })
            .state('login', {
              url: '/login',
              controller: 'loginCtrl',
              templateUrl: 'templates/user/login.html'
            })
            ;
    }
]);
// angular.module('RDash').config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//     when('/home', {
//       title: 'List questions',
//       templateUrl: 'html/questions/question.html',
//       controller: 'questionCtrl',
//     })
//     .when('/question/add', {
//       title: 'Add questions',
//       templateUrl: 'html/questions/questionNew.html',
//       controller: 'addQuestionCtrl',
//     })
//     .when('/question/edit/:id', {
//       title: ' Edit questions',
//       templateUrl: 'html/questions/questionEdit.html',
//       controller: 'editQuestionCtrl',
//     })
//     .when('/categories', {
//       title: "List Category",
//       templateUrl: 'html/categories/category.html',
//       controller: 'categoryCtrl',
//     })
//     .when('/examies',{
//       title: "Exam",
//       templateUrl: 'html/examies/exam.html',
//       controller: 'examCtrl',
//     })
//     .when('/examies/:id/sections',{
//       title: "Exam",
//       templateUrl: 'html/sections/section.html',
//       controller: 'sectionCtrl',
//     })
//     .when('/examies/:id/show',{
//       title: "Exam",
//       templateUrl: 'html/examies/detail.html',
//       controller: 'detailExamCtrl',
//     })
//     .when('/section_questions', {
//       title: "Question in Section",
//       controller: 'section_questionCtrl',
//     }).
//     when('/categories/:id/questions', {
//       title: "Question in Category",
//       controller: 'section_questionCtrl',
//     })
//     .otherwise({
//       redirectTo: '/home'
//     });
// }]);
