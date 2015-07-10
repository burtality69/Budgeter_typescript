///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var stackedBarController = (function () {
            function stackedBarController($scope, forecastParamSvc, forecastMgr) {
                this.spin = true;
                this.params = forecastParamSvc.params;
                this.forecastMgr = forecastMgr;
                this.scope = $scope;
            }
            stackedBarController.prototype.refresh = function () {
                var _this = this;
                this.forecastMgr.getForecast()
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
                    _this.spin = false;
                    _this.scope.$broadcast('renderChart');
                })
                    .error(function (err) {
                    console.log(err.message);
                });
            };
            stackedBarController.$inject = ['$scope', 'forecastParamSvc', 'forecastMgr'];
            return stackedBarController;
        })();
        Controllers.stackedBarController = stackedBarController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
