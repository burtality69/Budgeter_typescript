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
