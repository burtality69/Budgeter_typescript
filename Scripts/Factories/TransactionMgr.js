///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var transactionMgr = (function () {
            function transactionMgr($http, sessionService, apiFormatSvc) {
                this.http = $http;
                this.url = sessionService.apiURL + '/api/transactions';
                this.formatter = apiFormatSvc;
                this.sessionService = sessionService;
            }
            transactionMgr.prototype.get = function () {
                var config = {
                    method: 'GET',
                    url: this.url,
                    headers: this.sessionService.httpGetHeaders
                };
                return this.http(config);
            };
            /**Post a single transaction model */
            transactionMgr.prototype.post = function (t) {
                var config = {
                    method: 'POST',
                    url: this.url,
                    headers: this.sessionService.httpGetHeaders,
                    data: this.formatter.transtoServerFmt(t)
                };
                return this.http(config);
            };
            /**Update an existing transaction model */
            transactionMgr.prototype.put = function (t) {
                var config = {
                    method: 'PUT',
                    url: this.url + '/' + t.ID,
                    headers: this.sessionService.httpGetHeaders,
                    data: this.formatter.transtoServerFmt(t)
                };
                return this.http(config);
            };
            transactionMgr.prototype.delete = function (ID) {
                var config = {
                    method: 'DELETE',
                    url: this.url + '/' + ID,
                    headers: this.sessionService.httpGetHeaders
                };
                return this.http(config);
            };
            transactionMgr.prototype.newBlankTrans = function () {
                return {
                    ID: undefined,
                    Name: undefined,
                    TypeID: undefined,
                    UserID: undefined,
                    TypeDescription: undefined,
                    TransactionValues: []
                };
            };
            transactionMgr.$inject = ['$http', 'sessionService', 'apiFormatSvc'];
            return transactionMgr;
        })();
        Services.transactionMgr = transactionMgr;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
