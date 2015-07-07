/// <reference path="../All.d.ts"/>

module Budgeter {
  var app = angular.module('Budgeter', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'ngAnimate',
    'ngNotificationsBar'
  ])
    .controller(Budgeter.Controllers)
    .service(Budgeter.Services)
    .factory(Budgeter.Factories)
    .directive(Budgeter.Directives);


  var ConfigFunction: Function = function($routeProvider, $locationProvider, notificationsConfigProvider) {

    notificationsConfigProvider.setAutoHide(true)

    // delay before hide
    notificationsConfigProvider.setHideDelay(3000)

    $locationProvider.hashPrefix('!').html5Mode(true);

    $routeProvider
      .when('/login', {
        templateUrl: '/Views/Login.html',
        controller: 'AuthController'
      })
      .otherwise({
        redirectTo: '/'
      });
  };

  ConfigFunction.$inject = ['$routeProvider', '$locationProvider', 'notificationsConfigProvider'];
  app.config(ConfigFunction);
}