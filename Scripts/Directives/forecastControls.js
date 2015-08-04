///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function forecastControls() {
            return {
                restrict: 'EA',
                templateUrl: '/Views/Templates/forecastControls.html',
                controller: Budgeter.Controllers.forecastController,
                bindToController: true,
                controllerAs: 'fCtrl',
                transclude: true,
                scope: {}
            };
        }
        Directives.forecastControls = forecastControls;
        ;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        /** Manages the viewstate and parameters for the main view */
        var forecastController = (function () {
            function forecastController($scope, paramSvc) {
                this.scope = $scope;
                this.parametersVisible = true;
                this.forecastview = 'graph';
                this.forecastParams = paramSvc.params;
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
                this.scope.$broadcast('refresh');
            };
            forecastController.$inject = ['$scope', 'forecastParamSvc'];
            return forecastController;
        })();
        Controllers.forecastController = forecastController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
