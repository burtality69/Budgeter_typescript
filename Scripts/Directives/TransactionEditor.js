///<reference path ="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transactionEditor() {
            return {
                restrict: 'EA',
                require: '^transactionList',
                scope: {
                    trans: '=',
                    liststate: '='
                },
                templateUrl: '/Views/Templates/TransactionEditor.html',
                bindToController: true,
                controllerAs: 'transEditCtrl',
                controller: Budgeter.Controllers.transactionEditorController
            };
        }
        Directives.transactionEditor = transactionEditor;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transactionEditorController = (function () {
            function transactionEditorController(transactionMgr, listOptionsDataSvc, notify) {
                this.transactionMgr = transactionMgr;
                this.listSvc = listOptionsDataSvc;
                this.notify = notify;
                this.gettransactiontypes();
                this.gettransactionvalues();
                if (this.liststate.transactionToEdit == undefined) {
                    this.trans = this.transactionMgr.newBlankTrans();
                    this.newrecord = true;
                }
                else {
                    this.trans = this.liststate.transactionToEdit;
                    this.newrecord = false;
                }
            }
            transactionEditorController.prototype.gettransactiontypes = function () {
                var _this = this;
                this.listSvc.transactionfrequencies.success(function (data) {
                    return _this.frequencies = data;
                })
                    .error(function (e) {
                    return _this.notify({ message: 'Error loading data: ' + e, classes: 'alert-danger' });
                });
            };
            transactionEditorController.prototype.gettransactionvalues = function () {
                var _this = this;
                this.listSvc.transactiontypes.success(function (data) {
                    return _this.types = data;
                })
                    .error(function (e) {
                    return _this.notify({ message: 'Error loading data: ' + e, classes: 'alert-danger' });
                });
            };
            transactionEditorController.prototype.expandToggle = function () {
                if (!this.expanded) {
                    this.expanded = true;
                    this.liststate.addMode = true;
                }
                else {
                    this.expanded = false;
                    this.liststate.addMode = false;
                }
            };
            transactionEditorController.prototype.clear = function () {
                this.trans = this.transactionMgr.newBlankTrans();
            };
            transactionEditorController.prototype.cancel = function () {
                this.liststate.addMode = false;
            };
            transactionEditorController.prototype.submit = function () {
                var _this = this;
                if (this.newrecord) {
                    this.transactionMgr.post(this.trans)
                        .success(function (t) {
                        _this.notify({ message: 'Item created successfully: ', classes: 'alert-success' });
                        _this.liststate.addMode = false;
                    })
                        .error(function (e) {
                        _this.notify({ message: 'There was a problem submitting this item: ' + e, classes: 'alert-danger' });
                    });
                }
                else {
                    this.transactionMgr.put(this.trans)
                        .success(function (t) {
                        _this.notify({ message: 'Item updated successfully: ', classes: 'alert-success' });
                        _this.liststate.addMode = false;
                    })
                        .error(function (e) {
                        _this.notify({ message: 'There was a problem updating this item: ' + e, classes: 'alert-danger' });
                    });
                }
                //this.transactionMgr.post(this.trans)
                //.success(t => )
            };
            transactionEditorController.$inject = ['transactionMgr', 'listOptionsDataSvc', 'notify'];
            return transactionEditorController;
        })();
        Controllers.transactionEditorController = transactionEditorController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
