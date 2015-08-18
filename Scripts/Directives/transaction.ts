///<reference path="../../all.d.ts"/>

module Budgeter.Directives {
	
	export function transaction (): ng.IDirective {
		
		return {
			restrict: 'EA',
			templateUrl: '/Views/Templates/Transaction.html',
			require: '^transactionList',
			bindToController: true,
			controllerAs: 'transCtrl',
			//scope: true,
			//scope: { trans: '=', tliststate: '=', index: '=', deletefn: '&', list:'='},
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
		t: ITransactionModel;
	}
	
	export interface ITransValueListState {
		tvToEdit: ITransactionValueClientModel;
		addEdit: boolean; 
		tID: number;
	}
	
	export class transactionController {
		
		static $inject = ['$scope','transactionMgr','notify'];
		
		trans: ITransactionModel;
		tliststate: Budgeter.Controllers.IListState;
		tvListState: ITransValueListState; 
		deletefn: Function;
		index: number;
		expanded: boolean; 
		tlist: transactionListController;
		list: Array<ITransactionModel>
					
		constructor( $scope: ITransactionScope, public transactionMgr: Budgeter.Services.transactionMgr, public notify: ng.cgNotify.INotifyService) {
			$scope.transCtrl = this;
			this.trans = $scope.t;
			this.tvListState = {addEdit: false, tvToEdit: null, tID: this.trans.ID};
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