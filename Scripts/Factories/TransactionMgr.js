///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var transactionMgr = (function () {
            function transactionMgr($http, sessionService) {
                this.http = $http;
                this.url = sessionService.apiURL + '/api/transactions';
                this.headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionService.Token };
            }
            transactionMgr.prototype.get = function () {
                var config = { method: 'GET', url: this.url, headers: this.headers };
                return this.http(config);
            };
            transactionMgr.prototype.post = function (t) {
                var config = { method: 'POST', url: this.url, headers: this.headers, data: t };
                return this.http(config);
            };
            transactionMgr.prototype.put = function (t) {
                var config = { method: 'PUT', url: this.url + '/' + t.ID,
                    headers: this.headers, data: t };
                return this.http(config);
            };
            transactionMgr.prototype.delete = function (ID) {
                var config = { method: 'DELETE', url: this.url + '/' + ID,
                    headers: this.headers };
                return this.http(config);
            };
            transactionMgr.prototype.newBlankTrans = function () {
                return {
                    ID: null,
                    Name: null,
                    TypeID: null,
                    UserID: null,
                    TypeDescription: null,
                    TransactionValues: null
                };
            };
            transactionMgr.$inject = ['$http', 'sessionService'];
            return transactionMgr;
        })();
        Services.transactionMgr = transactionMgr;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
