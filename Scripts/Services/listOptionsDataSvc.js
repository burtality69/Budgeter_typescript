///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var listOptionsDataSvc = (function () {
            function listOptionsDataSvc(sessionService, $http) {
                this.http = $http;
                this.sessionService = sessionService;
            }
            Object.defineProperty(listOptionsDataSvc.prototype, "transactiontypes", {
                get: function () {
                    var config = {
                        method: 'GET',
                        url: this.sessionService.apiURL + '/api/admin/transactiontypes',
                        headers: this.sessionService.httpGetHeaders,
                    };
                    return this.http(config);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(listOptionsDataSvc.prototype, "transactionfrequencies", {
                get: function () {
                    var config = {
                        method: 'GET',
                        url: this.sessionService.apiURL + '/api/admin/transactionfrequencies',
                        headers: this.sessionService.httpGetHeaders
                    };
                    return this.http(config);
                },
                enumerable: true,
                configurable: true
            });
            listOptionsDataSvc.$inject = ['sessionService', '$http'];
            return listOptionsDataSvc;
        })();
        Services.listOptionsDataSvc = listOptionsDataSvc;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
