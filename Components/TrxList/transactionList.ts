///<reference path="../../all.d.ts"/>

module Budgeter.Directives {

    interface ITrxListScope extends ng.IScope {
        ctrl: trxListController;
    }

    export function transactionList(): ng.IDirective {

        return {
            templateUrl: './Components/TrxList/transactionList.htm',
            controllerAs: 'ctrl',
            controller: trxListController,
            scope: {},
            link: (s: ITrxListScope, e: ng.IAugmentedJQuery, a: ng.IAttributes) => { }
        }
    }


    class trxListController {

        static $inject = ['trxList', 'notify', '$modal'];

        public transactions: Array<ITransactionModel>;
        private $modalInstance: ng.ui.bootstrap.IModalServiceInstance;

        constructor(public trxList: Services.TrxList,
            public notify: ng.cgNotify.INotifyService,
            public $modal: ng.ui.bootstrap.IModalService) {
        }

        view(id: number) {
            let t = this.trxList.element(id);

            this.$modalInstance = this.$modal.open({
                templateUrl: '/Components/TrxList/trxEditModal.htm',
                controllerAs: 'ctrl',
                controller: trxModalCtrl,
                bindToController: true,
                size: 'md',
                resolve: { trx: () => t }
            })
        }

    }

    class trxModalCtrl {
        static $inject = ['trxList', 'listOptionsDataSvc', '$modalInstance', 'trx'];
        public trxTypes: string[];
        public trxFreqs: string[];

        constructor(public trxList: Services.TrxList, private listOptionsDataSvc: Services.listOptionsDataSvc, 
            private $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
            public trx: ITransactionModel) {
                this.trxTypes = this.listOptionsDataSvc.trxTypes;
                this.trxFreqs = this.listOptionsDataSvc.trxFreqs;
        }

        close() {
            this.$modalInstance.close();
        }
    }
}



	