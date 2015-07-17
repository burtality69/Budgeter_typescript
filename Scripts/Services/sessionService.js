///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var sessionService = (function () {
            function sessionService($cookies) {
                this.cookies = $cookies;
                //this._apiURl = 'http://budgeter.azurewebsites.net'
                this._apiURl = 'http://localhost:52243/';
            }
            Object.defineProperty(sessionService.prototype, "Token", {
                get: function () {
                    if (!this.cookies.get('authToken')) {
                        return undefined;
                    }
                    return this.cookies.get('authToken');
                },
                set: function (token) {
                    this.cookies.put('authToken', token);
                },
                enumerable: true,
                configurable: true
            });
            ;
            sessionService.prototype.destroySession = function () {
                this.cookies.remove('authToken');
            };
            Object.defineProperty(sessionService.prototype, "apiURL", {
                get: function () {
                    return this._apiURl;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(sessionService.prototype, "httpGetHeaders", {
                get: function () {
                    return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.Token };
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(sessionService.prototype, "httpPostHeaders", {
                get: function () {
                    return {};
                },
                enumerable: true,
                configurable: true
            });
            sessionService.$inject = ['$cookies'];
            return sessionService;
        })();
        Services.sessionService = sessionService;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
