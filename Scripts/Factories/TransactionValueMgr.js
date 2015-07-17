///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var transactionValueMgr = (function () {
            function transactionValueMgr($http, sessionService, apiFormatSvc) {
                this.http = $http;
                this.url = sessionService.apiURL + '/api/transactionValues';
                this.formatter = apiFormatSvc;
                this.sessionService = sessionService;
            }
            transactionValueMgr.prototype.get = function () {
                var config = {
                    method: 'GET',
                    url: this.url,
                    headers: this.sessionService.httpGetHeaders
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.post = function (t) {
                var config = {
                    method: 'POST',
                    url: this.url,
                    headers: this.sessionService.httpGetHeaders,
                    data: this.formatter.tvtoServerFmt(t)
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.put = function (t) {
                var config = {
                    method: 'PUT',
                    url: this.url + '/' + t.ID,
                    headers: this.sessionService.httpGetHeaders,
                    data: this.formatter.tvtoServerFmt(t)
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.delete = function (ID) {
                var config = {
                    method: 'DELETE',
                    url: this.url + '/' + ID,
                    headers: this.sessionService.httpGetHeaders,
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.getnewTransactionValue = function () {
                return {
                    ID: undefined,
                    TransactionID: undefined,
                    Value: undefined,
                    FrequencyID: undefined,
                    FrequencyDescription: undefined,
                    Day: undefined,
                    Start_date: undefined,
                    End_date: undefined
                };
            };
            transactionValueMgr.$inject = ['$http', 'sessionService', 'apiFormatSvc'];
            return transactionValueMgr;
        })();
        Services.transactionValueMgr = transactionValueMgr;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
