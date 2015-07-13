///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var transactionValueMgr = (function () {
            function transactionValueMgr($http, sessionService) {
                this.http = $http;
                this.url = sessionService.apiURL + '/api/transactionValues';
                this.headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionService.Token };
            }
            transactionValueMgr.prototype.get = function () {
                var config = {
                    method: 'GET',
                    url: this.url,
                    headers: this.headers
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.post = function (t) {
                var config = {
                    method: 'POST',
                    url: this.url,
                    headers: this.headers,
                    data: t
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.put = function (t) {
                var config = {
                    method: 'PUT',
                    url: this.url + '/' + t.ID,
                    headers: this.headers,
                    data: t
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.delete = function (ID) {
                var config = {
                    method: 'DELETE',
                    url: this.url + '/' + ID,
                    headers: this.headers,
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.formatForAPI = function (t) {
                return {};
            };
            transactionValueMgr.$inject = ['$http', 'sessionService'];
            return transactionValueMgr;
        })();
        Services.transactionValueMgr = transactionValueMgr;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
