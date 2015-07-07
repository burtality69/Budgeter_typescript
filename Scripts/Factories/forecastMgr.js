///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var forecastMgr = (function () {
            function forecastMgr($http, sessionService) {
                this.http = $http;
                this.sessionSrv = sessionService;
                this.config = {
                    method: 'GET',
                    url: this.sessionSrv.apiURL + '/api/Forecast?',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionService.Token
                    }
                };
            }
            forecastMgr.prototype.buildQuery = function (params) {
                var qs = JSON.stringify(params);
                this.config.url = this.config.url + qs;
            };
            forecastMgr.prototype.getForecast = function (forecastParams) {
                this.buildQuery(forecastParams);
                return this.http(this.config);
            };
            forecastMgr.$inject = ['$http', 'sessionService'];
            return forecastMgr;
        })();
        Services.forecastMgr = forecastMgr;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
