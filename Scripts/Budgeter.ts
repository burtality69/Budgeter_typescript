/// <reference path="../all.d.ts"/>

module Budgeter {
  let app = angular.module('budgeter', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngAnimate', 'cgNotify'])
    .service('sessionService', Services.sessionService)
    .service('forecastParamSvc', Services.forecastParamSvc)
    .service('authSvc', Services.authSvc)
    .service('apiFormatSvc', Services.apiFormatSvc)
    .service('forecastDataSvc', Services.forecastDataSvc)
    .service('trxDataService', Services.trxDataService)
    .service('trxdetailDataService', Services.trxdetailDataSvc)
    .service('listOptionsDataSvc', Services.listOptionsDataSvc)
    .service('trxList',Services.TrxList)
    .controller(Controllers)
    .directive(Directives);

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