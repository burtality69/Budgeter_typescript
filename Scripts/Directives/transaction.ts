///<reference path="../../all.d.ts"/>

module Budgeter.Directives {
	
	export function transaction (): ng.IDirective {
		
		return {
			restrict: 'EA',
			templateUrl: '/Views/Templates/Transaction.html',
			require: '^transactionList',
			bindToController: true,
			controllerAs: 'transCtrl',
			scope: { trans: '=', tliststate: '=', index: '=', deletefn: '&' },
			controller: Budgeter.Controllers.transactionController,
			replace: true,
			link: function(scope: Budgeter.Controllers.ITransactionScope, el: ng.IAugmentedJQuery,
				att: ng.IAttributes) {
					
				var v = scope.transCtrl.trans.TypeDescription
				var barclass = v == 'Income' ? 'progress-bar-success' : (v == 'Savings' ? 'progress-bar-warning' : 'progress-bar-danger'); 
				var labelclass = v == 'Income' ? 'label label-success' : (v == 'Savings' ? 'label label-warning' : 'label label-danger');
				
 				angular.element(el[0].querySelector('.label')).addClass(labelclass);
				angular.element(el[0].querySelector('.progress-bar')).addClass(barclass); 
			}
		}
	}
}

module Budgeter.Controllers {
	
	export interface ITransactionScope extends ng.IScope {
		transCtrl: Budgeter.Controllers.transactionController
	}
	
	export interface ITransValueListState {
		tvToEdit: ITransactionValueModel;
		addEdit: boolean; 
	}
	
	export class transactionController {
		
		trans: ITransactionModel;
		tliststate: Budgeter.Controllers.IListState;
		tvListState: ITransValueListState; 
		deletefn: Function;
		index: number;
		expanded: boolean; 
		tlist: transactionListController;
					
		constructor() {
		}
		
		expand() {
			if (!this.expanded) {
				this.tliststate.selectedItem = this.index;
				this.expanded = true;
			} else {
				this.tliststate.selectedItem = null;
				this.expanded = false;
			}
		}
		
		addTv() {

			var n: ITransactionValueModel = {
				ID: null,
				Start_date: null,
				End_date: null,
				FrequencyID: null,
				FrequencyDescription: null,
				Day: null,
				TransactionID: this.trans.ID,
				Value: null
			}
			this.tvListState.tvToEdit = n;
			this.tvListState.addEdit = true;
		}
		
		/** problem - this was added to the link function as controller injection isn't available in controller */
		delete() {
			this.deletefn(this.trans,this.index);	
		}
	}
}