///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        /** Manages the viewstate and parameters for the main view */
        var forecastController = (function () {
            function forecastController($scope) {
                var s = new Date();
                var e = Budgeter.Utilities.lastDay(s, 0);
                this.parametersVisible = true;
                this.mthOffset = 0;
                this.forecastview = 'graph';
                this.forecastParams = { startdate: s, enddate: e, startbal: 0 };
                this.headlines = { balance: 0, savings: 0, incoming: 0, outgoing: 0 };
            }
            /** advances the view date forward 1 month */
            forecastController.prototype.mthFwd = function () {
                this.mthOffset += 1;
                this.forecastParams.enddate = Budgeter.Utilities.lastDay(this.forecastParams.enddate, this.mthOffset);
            };
            /** steps the view date back 1 month */
            forecastController.prototype.mthBk = function () {
                this.mthOffset -= 1;
                this.forecastParams.enddate = Budgeter.Utilities.lastDay(this.forecastParams.enddate, this.mthOffset);
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
