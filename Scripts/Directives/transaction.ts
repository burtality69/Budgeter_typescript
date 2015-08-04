///<reference path="../../all.d.ts"/>

module Budgeter.Directives {
	
	export function transaction (): ng.IDirective {
		
		return {
			restrict: 'EA',
			templateUrl: '/Views/Templates/Transaction.html',
			require: '^transactionList',
			bindToController: true,
			controllerAs: 'transCtrl',
			scope: { trans: '=', tliststate: '=', index: '=', deletefn: '&', list:'='},
			controller: Budgeter.Controllers.transactionController,
			replace: true,
			link: function(scope: Budgeter.Controllers.ITransactionScope, el: ng.IAugmentedJQuery,
				att: ng.IAttributes) {
					
				var v = scope.transCtrl.trans.TypeDescription
				var barclass = v == 'Income' ? 'payment' : (v == 'Savings' ? 'savings' : 'deduction'); 

 				angular.element(el[0]).addClass(barclass);
			}
		}
	}
}

module Budgeter.Controllers {
	
	export interface ITransactionScope extends ng.IScope {
		transCtrl: Budgeter.Controllers.transactionController
	}
	
	export interface ITransValueListState {
		tvToEdit: ITransactionValueClientModel;
		addEdit: boolean; 
	}
	
	export class transactionController {
		
		static $inject = ['transactionMgr','notify'];
		
		trans: ITransactionModel;
		tliststate: Budgeter.Controllers.IListState;
		tvListState: ITransValueListState; 
		deletefn: Function;
		index: number;
		expanded: boolean; 
		tlist: transactionListController;
		transactionMgr: Budgeter.Services.transactionMgr; 
		notify: ng.cgNotify.INotifyService;
		list: Array<ITransactionModel>
					
		constructor(transactionMgr: Budgeter.Services.transactionMgr, notify: ng.cgNotify.INotifyService) {
			this.tvListState = {addEdit: false, tvToEdit: null};
			this.notify = notify;
			this.transactionMgr = transactionMgr;
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
			this.transactionMgr.delete(this.trans.ID)
			.success(d=>{
				this.list.splice(idx,1);
				this.notify({message: 'Item deleted successfully', classes: 'alert-success'});
			})
			.error(d=>{
				this.notify({message:'There was a problem deleting this item',classes:'alert-danger',duration: 5000});
			})
		}
	}
}