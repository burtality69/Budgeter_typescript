/* global budgeterDirectives */
budgeterDirectives.directive('transaction', ['ClsTransaction', 'ClsTransactionValue',
    function (ClsTransaction, ClsTransactionValue) {

        return {
            restrict: 'EA',
            require: '^transactionList',
            scope: { trans: '=', listmgr: '=', index: '=' },
            bindToController: true,
            controllerAs: 'transCtrl',
            controller: function () {

                var transCtrl = this;
                
                this.tvListMgr = {
                    addEdit: false,
                    tvToEdit: undefined
                };

                this.barclass = function () {
                    var v = transCtrl.trans.TypeDescription;
                    return v == 'Income' ? 'progress-bar-success' : (v == 'Savings' ? 'progress-bar-warning' : 'progress-bar-danger');
                };

                this.labelclass = function () {
                    var v = transCtrl.trans.TypeDescription;
                    return v == 'Income' ? 'label label-success' : (v == 'Savings' ? 'label label-warning' : 'label label-danger');
                };

                this.expandTransaction = function () {
                    if (!transCtrl.trans.expanded) {
                        transCtrl.listmgr.selecteditem = transCtrl.index;
                        transCtrl.trans.expanded = true;
                    } else {
                        transCtrl.listmgr.selecteditem = undefined;
                        transCtrl.trans.expanded = false;
                    };
                };

                // Called either by the edit button on a transactionvalue or by the add new button
                
                this.addTV = function () {
                    
                    var t = transCtrl.tvListMgr;
                    var n = new ClsTransactionValue;
                    n.TransactionID = transCtrl.trans.ID;
                    t.tvToEdit = n; 
                    t.addEdit = true;
                };
            },

            link: function (scope, elem, attrs, tList) {

                scope.transCtrl.delete = function () {
                    tList.deleteTrans(scope.transCtrl.trans, scope.transCtrl.index);
                };

            },

            templateUrl: '/Views/Templates/Transaction.html'

        };

    }]);

