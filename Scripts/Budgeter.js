/// <reference path="../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var app = angular.module('budgeter', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngAnimate', 'cgNotify']);
    app.service('sessionService', Budgeter.Services.sessionService);
    app.service('forecastParamSvc', Budgeter.Services.forecastParamSvc);
    app.service('authFactory', Budgeter.Services.authFactory);
    app.service('forecastMgr', Budgeter.Services.forecastMgr);
    app.service('transactionMgr', Budgeter.Services.transactionMgr);
    app.service('transactionValueMgr', Budgeter.Services.transactionValueMgr);
    app.controller(Budgeter.Controllers);
    app.directive(Budgeter.Directives);
    var ConfigFunction = function ($routeProvider, $locationProvider) {
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
})(Budgeter || (Budgeter = {}));
