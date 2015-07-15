///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transaction() {
            return {
                restrict: 'EA',
                templateUrl: '/Views/Templates/Transaction.html',
                require: '^transactionList',
                bindToController: true,
                controllerAs: 'transCtrl',
                scope: { trans: '=', tliststate: '=', index: '=', deletefn: '&' },
                controller: Budgeter.Controllers.transactionController,
                replace: true,
                link: function (scope, el, att) {
                    var v = scope.transCtrl.trans.TypeDescription;
                    var barclass = v == 'Income' ? 'progress-bar-success' : (v == 'Savings' ? 'progress-bar-warning' : 'progress-bar-danger');
                    var labelclass = v == 'Income' ? 'label label-success' : (v == 'Savings' ? 'label label-warning' : 'label label-danger');
                    angular.element(el[0].querySelector('.label')).addClass(labelclass);
                    angular.element(el[0].querySelector('.progress-bar')).addClass(barclass);
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
                this.tvListState = { addEdit: false, tvToEdit: null };
            }
            transactionController.prototype.expand = function () {
                if (!this.expanded) {
                    this.tliststate.selectedItem = this.index;
                    this.expanded = true;
                }
                else {
                    this.tliststate.selectedItem = null;
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
            return transactionController;
        })();
        Controllers.transactionController = transactionController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
