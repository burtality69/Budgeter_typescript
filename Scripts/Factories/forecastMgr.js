///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var forecastMgr = (function () {
            function forecastMgr($http, sessionService, forecastParamSvc) {
                this.http = $http;
                this.sessionSrv = sessionService;
                this.forecastParams = forecastParamSvc;
                this.config = {
                    method: 'GET',
                    url: this.sessionSrv.apiURL + '/api/Forecast',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.sessionSrv.Token
                    },
                    transformResponse: function (data) {
                        var dat = JSON.parse(data);
                        var ret = [];
                        Object.keys(dat).forEach(function (p) {
                            ret.push(dat[p]);
                        });
                        return ret;
                    }
                };
            }
            forecastMgr.prototype.getForecast = function () {
                this.config.params = this.forecastParams.apiParams;
                return this.http(this.config);
            };
            forecastMgr.$inject = ['$http', 'sessionService', 'forecastParamSvc'];
            return forecastMgr;
        })();
        Services.forecastMgr = forecastMgr;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
