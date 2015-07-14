///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transaction() {
            return {
                restrict: 'EA',
                replace: true,
                templateUrl: '/Views/Templates/Transaction.html',
                scope: { trans: '=', tListState: '=', index: '=', deletefn: '=' },
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
            function transactionController() {
                this.tvListState = { tvToEdit: null, addEdit: false };
                this.expanded = false;
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
            /** problem - this was added to the link function as controller injection isn't available in controller */
            transactionController.prototype.delete = function () {
                this.deletefn(this.trans, this.index);
            };
            transactionController.$inject = ['$scope'];
            return transactionController;
        })();
        Controllers.transactionController = transactionController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
