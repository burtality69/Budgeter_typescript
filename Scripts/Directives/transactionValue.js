///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transactionValueController = (function () {
            function transactionValueController(transactionValueMgr, notify) {
                this.tvMgr = transactionValueMgr;
                this.notify = notify;
            }
            transactionValueController.prototype.edit = function () {
                this.liststate.tvToEdit = this.tv;
                this.liststate.addEdit = true;
            };
            transactionValueController.prototype.delete = function () {
                var _this = this;
                this.tvMgr.delete(this.tv.ID)
                    .success(function (d) {
                    _this.notify({ message: 'Item deleted successfully', classes: 'alert-success' });
                })
                    .error(function (e) {
                    _this.notify({ message: "Couldn't delete this transaction: " + e, classes: 'alert-danger' });
                });
            };
            transactionValueController.$inject = ['transactionValueMgr', 'notify'];
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
