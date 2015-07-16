///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transValueListController = (function () {
            function transValueListController($scope) {
                this.listState = { tvToEdit: null, addEdit: false };
            }
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
                scope: { transactionValues: '=' },
            };
        }
        Directives.transValuesList = transValuesList;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
