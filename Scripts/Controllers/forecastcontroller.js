///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        /** Manages the viewstate and parameters for the main view */
        var forecastController = (function () {
            function forecastController(paramSvc) {
                this.parametersVisible = true;
                this.forecastview = 'graph';
                this.forecastParams = paramSvc.params;
                this.headlines = { balance: 0, savings: 0, incoming: 0, outgoing: 0 };
            }
            /** advances the view date forward 1 month */
            forecastController.prototype.mthFwd = function () {
                this.forecastParams.endDate = Budgeter.Utilities.lastDay(this.forecastParams.endDate, +1);
            };
            /** steps the view date back 1 month */
            forecastController.prototype.mthBk = function () {
                this.forecastParams.endDate = Budgeter.Utilities.lastDay(this.forecastParams.endDate, -1);
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
            forecastController.$inject = ["forecastParamSvc"];
            return forecastController;
        })();
        Controllers.forecastController = forecastController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
