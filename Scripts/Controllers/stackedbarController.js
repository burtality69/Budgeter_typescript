///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var stackedBarController = (function () {
            function stackedBarController(scope, forecastController, forecastMgr) {
                this.spin = true;
            }
            stackedBarController.prototype.refresh = function (params) {
            };
            stackedBarController.$inject = ['$scope', 'forecastController', 'forecastMgr'];
            return stackedBarController;
        })();
        Controllers.stackedBarController = stackedBarController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
