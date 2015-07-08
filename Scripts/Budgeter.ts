/// <reference path="../All.d.ts"/>

module Budgeter {
  var app = angular.module('budgeter', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngAnimate', 'ngNotificationsBar'])
  app.service(Budgeter.Services)
  app.directive(Budgeter.Directives)
  app.controller(Budgeter.Controllers);

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