///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Factories;
    (function (Factories) {
        var authFactory = (function () {
            function authFactory($http, sessionService) {
                this.http = $http;
                this.sessionSrv = sessionService;
            }
            authFactory.prototype.login = function (username, password) {
                var config = {
                    method: 'POST',
                    url: this.sessionSrv.apiURL + '/token',
                    data: { grant_type: "password", userName: username, password: password },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;' }
                };
                return this.http(config);
            };
            authFactory.prototype.register = function (regForm) {
                var config = {
                    method: 'POST',
                    url: this.sessionSrv.apiURL + '/api/Account/register',
                    data: regForm,
                    headers: { 'Content-Type': 'application/json' },
                };
                return this.http(config);
            };
            authFactory.$inject = ['$http', 'sessionService'];
            return authFactory;
        })();
        Factories.authFactory = authFactory;
    })(Factories = Budgeter.Factories || (Budgeter.Factories = {}));
})(Budgeter || (Budgeter = {}));
