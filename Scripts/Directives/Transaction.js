///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transaction() {
            return {
                restrict: 'EA',
                require: '^transactionList',
                templateUrl: '/Views/Templates/Transaction.html',
                scope: { trans: '=', listmgr: '=', index: '=' },
                bindToController: true,
                controllerAs: 'transCtrl',
                controller: Budgeter.Controllers.transactionController,
                link: function (scope, el, att, ctrl) {
                    var v = ctrl.trans.TypeDescription;
                    var barclass = v == 'Income' ? 'progress-bar-success' : (v == 'Savings' ? 'progress-bar-warning' : 'progress-bar-danger');
                    var labelclass = v == 'Income' ? 'label label-success' : (v == 'Savings' ? 'label label-warning' : 'label label-danger');
                    el.children('.label').addClass(labelclass);
                    el.children('.progress-bar').addClass(barclass);
                }
            };
        }
        Directives.transaction = transaction;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transactionController = (function () {
            function transactionController($scope, transactionListController) {
                this.trans = $scope.trans;
                this.tListState = $scope.listmgr;
                this.index = $scope.index;
                this.expanded = false;
                this.tlist = transactionListController;
            }
            transactionController.prototype.expand = function () {
                if (!this.expanded) {
                    this.tListState.selectedItem = this.index;
                    this.expanded = true;
                }
                else {
                    this.tListState.selectedItem = null;
                    this.expanded = false;
                }
            };
            transactionController.prototype.addTv = function () {
                var n = {
                    ID: null,
                    Start_date: null,
                    End_date: null,
                    FrequencyID: null,
                    FrequencyDescription: null,
                    Day: null,
                    TransactionID: this.trans.ID,
                    Value: null
                };
                this.tvListState.tvToEdit = n;
                this.tvListState.addEdit = true;
            };
            transactionController.prototype.delete = function () {
                this.tlist.delete(this.trans, this.index);
            };
            transactionController.$inject = ['transactionListController'];
            return transactionController;
        })();
        Controllers.transactionController = transactionController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
