///<reference path="../../all.d.ts"/>


module Budgeter.Directives {
    
    interface ITrxListScope {
        ctrl: trxListController;
    }
    
    export function transactionList(): ng.IDirective {

        return {
            templateUrl: 'Views/Templates/transactionList.html',
            controllerAs: 'tListCtrl',
            controller: trxListController,
            scope: {},
            link: (s: ITrxListScope, e: ng.IAugmentedJQuery, a: ng.IAttributes) {
                s.ctrl.refresh();
            }

        }
    }


    class trxListController {

        static $inject = ['trxDataSvc', 'transactionValueMgr', 'notify', '$rootScope', 'apiFormatSvc'];

        public listState: IListState;
        public transactions: Array<ITransactionModel>;

        constructor(public trxDataSvc: Services.trxDataService,
            public notify: ng.cgNotify.INotifyService,
            public $rootScope: ng.IRootScopeService,
            public trxdetailDataSvc: Budgeter.Services.trxdetailDataSvc) {

            this.listState = {
                addMode: false,
                selectedItem: null,
                transactionToEdit: null
            };
        }
		
        /** get the list */
        refresh() {
            this.trxDataSvc.get()
                .then(d => this.transactions = d)
                .catch((e: Error) => this.notify({ message: `Error loading data: ${e.message}`, classes: 'alert-danger' }))
        }

        delete(t: ITransactionModel, idx: number) {
            this.trxDataSvc.delete(t.ID)
                .then(d => {
                    this.$rootScope.$broadcast('renderChart');
                    this.notify({ message: 'Transaction deleted', classes: 'alert-success' })
                    this.transactions.splice(idx, 1);
                    this.listState.selectedItem = null;
                })
                .catch(e=> {
                    this.notify({ message: 'There was a problem deleting the item ' + e, classes: 'alert-danger' })
                })
        }

        add(t: ITransactionModel) {
            if (t.ID == undefined) {
                this.trxDataSvc.post(t)
                    .then(s => {
                        this.$rootScope.$broadcast('renderChart');
                        this.notify({ message: 'Transaction added', classes: 'alert-success' });
                        this.transactions.push(s);
                        this.toggleAddForm();
                    })
                    .catch(err =>
                        this.notify({ message: err, classes: 'alert-danger' })
                    )
            }
            else {
                this.trxDataSvc.put(t)
                    .then(r => {
                        this.notify({ message: 'Transaction updated', classes: 'alert-success' })
                    })
                    .catch(e=> {
                        this.notify({ message: 'There was a problem updating the item ' + e, classes: 'alert-danger' })
                    })
            }
        }

        toggleAddForm() {
            this.listState.addMode = !this.listState.addMode;
        }
		
        /** should the passed transaction be visible? */
        isVisible(idx: number) {
            var t = this.listState;
            if (t.addMode) {
                return false;
            } else if (t.selectedItem == null || t.selectedItem == idx) {
                return true
            }
        }
    }

}



	