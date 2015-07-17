///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transactionValueEditorCtrl = (function () {
            function transactionValueEditorCtrl(transactionValueMgr, notify, $rootscope, listOptionsDataSvc) {
                this.listOptionsDataSvc = listOptionsDataSvc;
                this.notify = notify;
                this.transactionValueMgr = transactionValueMgr;
                if (this.listState.tvToEdit != undefined) {
                    this.tv = this.listState.tvToEdit;
                    this.newitem = false;
                }
                else {
                    this.tv = this.transactionValueMgr.getnewTransactionValue();
                    this.tv.ID = this.transactionID;
                    this.newitem = true;
                }
                this.getfrequencies();
            }
            transactionValueEditorCtrl.prototype.getfrequencies = function () {
                var _this = this;
                this.listOptionsDataSvc.transactionfrequencies
                    .success(function (d) {
                    _this.frequencies = d;
                })
                    .error(function (e) {
                    _this.notify({ message: 'There was a problem loading data', classes: 'alert-danger' });
                });
            };
            /** either post or put a transactionvalue depending on values in liststate */
            transactionValueEditorCtrl.prototype.submit = function () {
                var _this = this;
                if (this.newitem) {
                    this.transactionValueMgr.post(this.tv)
                        .success(function (d) {
                        _this.notify({ message: 'Item created successfully', classes: 'alert-success' });
                    })
                        .error(function (e) {
                        _this.notify({ message: 'There was a problem submitting the item', classes: 'alert-danger' });
                    });
                }
                else {
                    this.transactionValueMgr.put(this.tv)
                        .success(function (d) {
                        _this.notify({ message: 'Item created successfully', classes: 'alert-success' });
                    })
                        .error(function (e) {
                        _this.notify({ message: 'There was a problem submitting the item', classes: 'alert-danger' });
                    });
                }
            };
            transactionValueEditorCtrl.prototype.cancel = function () {
                this.listState.addEdit = false;
            };
            transactionValueEditorCtrl.prototype.delete = function () {
                var _this = this;
                this.transactionValueMgr.delete(this.tv.ID)
                    .success(function (d) {
                    _this.notify({ message: 'Item deleted successfully', classes: 'alert-success' });
                })
                    .error(function (e) {
                    _this.notify({ message: 'Error' + e, classes: 'alert-danger' });
                });
            };
            transactionValueEditorCtrl.$inject = ['transactionValueMgr', 'notify', '$rootScope', 'listOptionsDataSvc'];
            return transactionValueEditorCtrl;
        })();
        Controllers.transactionValueEditorCtrl = transactionValueEditorCtrl;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transactionValueEditor() {
            return {
                restrict: 'EA',
                scope: { listState: '=', transactionID: '=' },
                require: '^transaction',
                controllerAs: 'tvEditCtrl',
                bindToController: true,
                controller: Budgeter.Controllers.transactionValueEditorCtrl,
                templateUrl: 'Views/Templates/TransactionValueEditor.html'
            };
        }
        Directives.transactionValueEditor = transactionValueEditor;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
