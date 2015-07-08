///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        /** Manages the viewstate and parameters for the main view */
        var forecastController = (function () {
            function forecastController($scope) {
                this.scope = $scope;
                var s = new Date();
                var e = utilities.lastDay(s, 0);
                this.forecastview = 'graph';
                this.forecastParams = { startdate: s, enddate: e, startbal: 0 };
                this.headlines = { balance: 0, savings: 0, incoming: 0, outgoing: 0 };
            }
            /** advances the view date forward 1 month */
            forecastController.prototype.monthfwd = function () {
                this.mthOffset += 1;
                this.forecastParams.enddate = utilities.lastDay(this.forecastParams.enddate, this.mthOffset);
            };
            /** steps the view date back 1 month */
            forecastController.prototype.monthBk = function () {
                this.mthOffset -= 1;
                this.forecastParams.enddate = utilities.lastDay(this.forecastParams.enddate, this.mthOffset);
            };
            forecastController.prototype.showParameters = function () {
                this.parametersVisible = !this.parametersVisible;
            };
            forecastController.prototype.refresh = function () {
                if (this.forecastview == 'graph') {
                    this.scope.$broadcast('renderChart');
                }
                else {
                    this.scope.$broadcast('renderGrid');
                }
            };
            forecastController.$inject = ["$scope"];
            return forecastController;
        })();
        Controllers.forecastController = forecastController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
