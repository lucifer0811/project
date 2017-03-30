/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.questions', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('questions', {
          url: '/questions',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          controller: 'QuestionsPagesCtrl',
          title: 'Questions',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        }).state('questions.list', {
          url: '/list',
          templateUrl: 'app/pages/questions/qu.html',
          title: 'List',
          sidebarMeta: {
            order: 0,
          },
        })
        $urlRouterProvider.when('/tables','/tables/basic');
  }

})();
