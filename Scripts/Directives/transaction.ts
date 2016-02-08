///<reference path="../../all.d.ts"/>


module Budgeter.Directives {


    interface ITransactionScope extends ng.IScope {
        transCtrl: transactionController
        t: ITransactionModel;
    }

    export function transaction(): ng.IDirective {

        return {
            restrict: 'EA',
            templateUrl: '/Views/Templates/Transaction.html',
            require: '^transactionList',
            bindToController: true,
            controller: transactionController,
            replace: true,
            scope: false,
            link: function(scope: ITransactionScope, el: ng.IAugmentedJQuery,
                att: ng.IAttributes) {

                var v = scope.transCtrl.trans.TypeDescription
                var barclass = v == 'Income' ? 'payment' : (v == 'Savings' ? 'savings' : 'deduction');

                angular.element(el[0]).addClass(barclass);
            }
        }
    }
}



interface ITransValueListState {
    tvToEdit: ITransactionValueClientModel;
    addEdit: boolean;
    tID: number;
}

class transactionController {

    static $inject = ['$scope', 'trxDataService', 'notify'];

    trans: ITransactionModel;
    tliststate: Budgeter.Controllers.IListState;
    tvListState: ITransValueListState;
    deletefn: Function;
    index: number;
    expanded: boolean;
    tlist: transactionListController;
    list: Array<ITransactionModel>;

    constructor($scope: ITransactionScope, public trxDataService: Budgeter.Services.trxDataService, public notify: ng.cgNotify.INotifyService) {
        $scope.transCtrl = this;
        this.tliststate = $scope.$parent.tListCtrl.listState;
        this.trans = $scope.t;
        this.tvListState = { addEdit: false, tvToEdit: null, tID: this.trans.ID };
    }
	
    /**expand this transaction - trigger the contraction of all others */
    expand() {
        if (!this.expanded) {
            this.tliststate.selectedItem = this.index;
            this.expanded = true;
        } else {
            this.tliststate.selectedItem = null;
            this.expanded = false;
        }
    }

    editToggle() {
        this.tliststate.transactionToEdit = this.trans;
        this.tliststate.addMode = true;
    }
	
    /** inheriting from the list controller */
    delete(idx: number) {
        this.trxDataService.delete(this.trans.ID)
            .then(d=> {
                this.list.splice(idx, 1);
                this.notify({ message: 'Item deleted successfully', classes: 'alert-success' });
            })
            .catch(e=> {
                this.notify({ message: `Problem deleting: ${e.message}`, classes: 'alert-danger' });
            })
    }
}
