///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {

	export interface ITransactionValueScope extends ng.IScope {
		tv: ITransactionValueClientModel,
		liststate: ITransValueListState
	}

	export class transactionValueController {

		static $inject = ['transactionValueMgr', 'notify'];

		liststate: ITransValueListState;
		tv: ITransactionValueClientModel;
		tvMgr: Budgeter.Services.transactionValueMgr;
		notify: ng.cgNotify.INotifyService;

		constructor(transactionValueMgr: Budgeter.Services.transactionValueMgr,
			notify: ng.cgNotify.INotifyService) {
			this.tvMgr = transactionValueMgr;
			this.notify = notify;
		}

		edit() {
			this.liststate.tvToEdit = this.tv;
			this.liststate.addEdit = true;
		}

		delete() {
			this.tvMgr.delete(this.tv.ID)
				.success(d => {
					this.notify({message:'Item deleted successfully', classes: 'alert-success'});
					
				})
				.error(e => {
					this.notify({message:"Couldn't delete this transaction: "+e,classes: 'alert-danger'}) 
				})
		}
	}
}

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
