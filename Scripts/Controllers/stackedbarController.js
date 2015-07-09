///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var stackedBarController = (function () {
            function stackedBarController(scope, forecastController, forecastMgr) {
                this.spin = true;
                this.forecastController = forecastController;
                this.forecastMgr = forecastMgr;
            }
            stackedBarController.prototype.refresh = function (params) {
                var _this = this;
                this.forecastMgr.getForecast(this.forecastController.forecastParams)
                    .success(function (response) {
                    _this.data = response;
                    var lastrow = response[response.length - 1];
                    var income = 0;
                    var outgoing = 0;
                    for (var i = 0; i < response.length; i++) {
                        income += response[i].total_payments;
                        outgoing += response[i].total_deductions;
                    }
                    _this.headlines.balance = lastrow.balance;
                    _this.headlines.savings = lastrow.savings;
                    _this.headlines.incoming = income;
                    _this.headlines.outgoing = outgoing;
                })
                    .error(function (err) {
                    console.log(err.message);
                });
            };
            stackedBarController.$inject = ['$scope', 'forecastController', 'forecastMgr'];
            return stackedBarController;
        })();
        Controllers.stackedBarController = stackedBarController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
