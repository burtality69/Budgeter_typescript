///<reference path="../../all.d.ts"/>

module Budgeter.Directives {

	export function transactionValue(): ng.IDirective {

		return {
			restrict: 'EA',
			scope: { tv: '=', liststate: '=' },
			replace: true,
			controllerAs: 'tvCtrl',
			bindToController: true,
			controller: Budgeter.Controllers.transactionValueController,
			templateUrl: 'Views/Templates/transactionValue.html'
		}
	}
}

module Budgeter.Controllers {

	export interface ITransactionValueScope extends ng.IScope {
		tv: ITransactionValueClientModel,
		liststate: ITransValueListState
	}

	export class transactionValueController {

		static $inject = ['transactionValueMgr', 'notify'];

		public liststate: ITransValueListState;
		public tv: ITransactionValueClientModel;

		constructor(public transactionValueMgr: Budgeter.Services.transactionValueMgr,
			public notify: ng.cgNotify.INotifyService) {
		}

		edit() {
			this.liststate.tvToEdit = this.tv;
			this.liststate.addEdit = true;
		}

		delete() {
			this.transactionValueMgr.delete(this.tv.ID)
				.then(d => {
					this.notify({ message: 'Item deleted successfully', classes: 'alert-success' });
				})
				.catch(e => {
					this.notify({ message: "Couldn't delete this transaction: " + e, classes: 'alert-danger' })
				})
		}
	}
}


