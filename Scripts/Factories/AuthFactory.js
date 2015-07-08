///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var authFactory = (function () {
            function authFactory($http, sessionService) {
                this.http = $http;
                this.sessionSrv = sessionService;
            }
            authFactory.prototype.login = function (loginForm) {
                var config = {
                    method: 'POST',
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    url: this.sessionSrv.apiURL + '/token',
                    data: { grant_type: "password", userName: loginForm.username, password: loginForm.password },
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
        Services.authFactory = authFactory;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
