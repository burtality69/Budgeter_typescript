///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function forecastControls(forecastParams) {
            return {
                restrict: 'EA',
                templateUrl: '/Views/Templates/forecastControls.html',
                bindToController: true,
                controllerAs: 'fCtrl',
                transclude: true,
                scope: {},
                controller: Budgeter.Controllers.forecastController
            };
        }
        Directives.forecastControls = forecastControls;
        ;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
