///<reference path="../../all.d.ts"/>

module Budgeter.Directives {


    interface ITransactionScope extends ng.IScope {
        ctrl: transactionController
        t: ITransactionModel;
    }

    export function transaction(): ng.IDirective {

        return {
            restrict: 'EA',
            templateUrl: '/Components/Trx/Transaction.htm',
            require: '^transactionList',
            bindToController: true,
            controller: transactionController,
            controllerAs: 'ctrl',
            replace: true,
            scope: {trx: '='},
            link: (s: ITransactionScope, e: ng.IAugmentedJQuery,a: ng.IAttributes)=> {
 
                let v = s.ctrl.trx.TypeDescription
                let barclass = v == 'Income' ? 'payment' : (v == 'Savings' ? 'savings' : 'deduction');

                angular.element(e[0]).addClass(barclass);
            }
        }
    }
}

class transactionController {

    static $inject = ['notify'];
    public trx: ITransactionModel;
    
    constructor(notify: ng.cgNotify.INotifyService){
        
    }

}
