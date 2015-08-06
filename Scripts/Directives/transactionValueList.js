///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transValueListController = (function () {
            function transValueListController() {
            }
            transValueListController.prototype.addNew = function () {
                this.listState.addEdit = true;
            };
            transValueListController.$inject = ['$scope'];
            return transValueListController;
        })();
        Controllers.transValueListController = transValueListController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transValuesList() {
            return {
                restrict: 'EA',
                require: 'transaction',
                templateUrl: 'Views/Templates/transactionValueList.html',
                replace: true,
                controller: Budgeter.Controllers.transValueListController,
                bindToController: true,
                controllerAs: 'tvListCtrl',
                scope: { transactionValues: '=', listState: '=' },
            };
        }
        Directives.transValuesList = transValuesList;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
