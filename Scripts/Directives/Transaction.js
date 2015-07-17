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
                scope: { trans: '=', tliststate: '=', index: '=', deletefn: '&', list: '=' },
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
            function transactionController(transactionMgr, notify) {
                this.tvListState = { addEdit: false, tvToEdit: null };
                this.notify = notify;
                this.transactionMgr = transactionMgr;
            }
            /**expand this transaction - trigger the contraction of all others */
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
            transactionController.prototype.editToggle = function () {
                this.tliststate.transactionToEdit = this.trans;
                this.tliststate.addMode = true;
            };
            /** inheriting from the list controller */
            transactionController.prototype.delete = function (idx) {
                var _this = this;
                this.transactionMgr.delete(this.trans.ID)
                    .success(function (d) {
                    _this.list.splice(idx, 1);
                    _this.notify({ message: 'Item deleted successfully', classes: 'alert-success' });
                })
                    .error(function (d) {
                    _this.notify({ message: 'There was a problem deleting this item', classes: 'alert-danger', duration: 5000 });
                });
            };
            transactionController.$inject = ['transactionMgr', 'notify'];
            return transactionController;
        })();
        Controllers.transactionController = transactionController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
