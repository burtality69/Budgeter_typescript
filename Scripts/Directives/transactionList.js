///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        ;
        var transactionListController = (function () {
            function transactionListController(transactionMgr, notify, $rootScope, transactionValueMgr, apiFormatSvc) {
                this.listState = {
                    addMode: false,
                    selectedItem: null,
                    transactionToEdit: null
                };
                this.formatter = apiFormatSvc;
                this.tMgr = transactionMgr;
                this.tvMgr = transactionValueMgr;
            }
            /** get the list */
            transactionListController.prototype.refresh = function () {
                var _this = this;
                this.tMgr.get().success(function (data) {
                    _this.transactions = data.map(function (d) {
                        return _this.formatter.transtoClientFmt(d);
                    });
                })
                    .error(function (err) {
                    _this.notify({ message: 'Error loading data', classes: 'alert-danger' });
                });
            };
            transactionListController.prototype.delete = function (t, idx) {
                var _this = this;
                this.tMgr.delete(t.ID).success(function (d) {
                    _this.rootscope.$broadcast('renderChart');
                    _this.notify({ message: 'Transaction deleted', classes: 'alert-success' });
                    _this.transactions.splice(idx, 1);
                    _this.listState.selectedItem = null;
                });
            };
            transactionListController.prototype.add = function (t) {
                var _this = this;
                if (t.ID == undefined) {
                    this.tMgr.post(t)
                        .success(function (s) {
                        _this.rootscope.$broadcast('renderChart');
                        _this.notify({ message: 'Transaction added', classes: 'alert-success' });
                        _this.transactions.push(s);
                        _this.listState.addMode = false;
                    })
                        .error(function (err) {
                        return _this.notify({ message: err, classes: 'alert-danger' });
                    });
                }
                else {
                    this.tMgr.put(t).success(function (r) {
                        return _this.notify({ message: 'Transaction updated', classes: 'alert-success' });
                    });
                }
            };
            transactionListController.prototype.toggleAddForm = function () {
                this.listState.addMode = !this.listState.addMode;
            };
            /** should the passed transaction be visible? */
            transactionListController.prototype.isVisible = function (idx) {
                var t = this.listState;
                if (t.addMode) {
                    return false;
                }
                else if (t.selectedItem == null || t.selectedItem == idx) {
                    return true;
                }
            };
            transactionListController.$inject = ['transactionMgr', 'transactionValueMgr', 'notify', '$rootScope', 'apiFormatSvc'];
            return transactionListController;
        })();
        Controllers.transactionListController = transactionListController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transactionList() {
            return {
                templateUrl: 'Views/Templates/transactionList.html',
                controllerAs: 'tListCtrl',
                controller: Budgeter.Controllers.transactionListController,
                scope: {},
                link: function (scope, el, att, ctrl) {
                    ctrl.refresh();
                }
            };
        }
        Directives.transactionList = transactionList;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
