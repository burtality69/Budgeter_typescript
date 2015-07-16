///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transactionValueController = (function () {
            function transactionValueController($scope) {
            }
            transactionValueController.prototype.edit = function () {
                this.liststate.tvToEdit = this.tv;
                this.liststate.addEdit = true;
            };
            return transactionValueController;
        })();
        Controllers.transactionValueController = transactionValueController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transactionValue() {
            return {
                restrict: 'EA',
                scope: { tv: '=', liststate: '=' },
                replace: true,
                controllerAs: 'tvCtrl',
                bindToController: true,
                controller: Budgeter.Controllers.transactionValueController,
                templateUrl: 'Views/Templates/transactionValue.html'
            };
        }
        Directives.transactionValue = transactionValue;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
