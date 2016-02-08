/// <reference path="../all.d.ts"/>

module Budgeter {
  let app = angular.module('budgeter', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngAnimate', 'cgNotify'])
    .service('sessionService', Budgeter.Services.sessionService)
    .service('forecastParamSvc', Budgeter.Services.forecastParamSvc)
    .service('authSvc', Budgeter.Services.authSvc)
    .service('apiFormatSvc', Budgeter.Services.apiFormatSvc)
    .service('forecastDataSvc', Budgeter.Services.forecastDataSvc)
    .service('trxDataService', Budgeter.Services.trxDataService)
    .service('trxdetailDataSvc', Budgeter.Services.trxdetailDataSvc)
    .service('listOptionsDataSvc', Budgeter.Services.listOptionsDataSvc)
    .controller(Budgeter.Controllers)
    .directive(Budgeter.Directives);

  let ConfigFunction = ($routeProvider, $locationProvider: ng.ILocationProvider) => {
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

  ConfigFunction.$inject = ['$routeProvider', '$locationProvider'];
  app.config(ConfigFunction);
}