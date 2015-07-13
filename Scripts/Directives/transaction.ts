///<reference path="../../all.d.ts"/>

module Budgeter.Directives {
	
	export function transaction (): ng.IDirective {
		return {
			restrict: 'EA',
			require: '^transactionList',
			templateUrl: '/Views/Templates/Transaction.html',
			scope: {trans: '=',listmgr: '=', index: '='},
			bindToController: true,
			controllerAs: 'transCtrl',
			controller: Budgeter.Controllers.transactionController,
			link: function(scope: ng.IScope, el: JQuery, 
				att: ng.IAttributes, ctrl: Budgeter.Controllers.transactionController) {
					
				var v = ctrl.trans.TypeDescription;
				var barclass = v == 'Income' ? 'progress-bar-success' : (v == 'Savings' ? 'progress-bar-warning' : 'progress-bar-danger'); 
				var labelclass = v == 'Income' ? 'label label-success' : (v == 'Savings' ? 'label label-warning' : 'label label-danger');
				
				el.children('.label').addClass(labelclass);
				el.children('.progress-bar').addClass(barclass); 
			}
		}
	}
}

module Budgeter.Controllers {
	
	interface ITransactionScope extends ng.IScope {
		trans: ITransactionModel,
		listmgr: Budgeter.Controllers.IListState
		index: number;
	}
	
	interface ITransValueListState {
		tvToEdit: ITransactionValueModel;
		addEdit: boolean; 
	}
	
	export class transactionController {
		
		static $inject = ['transactionListController'];
		trans: ITransactionModel;
		tListState: Budgeter.Controllers.IListState;
		tvListState: ITransValueListState; 
		index: number;
		expanded: boolean; 
		tlist: transactionListController;
					
		constructor($scope: ITransactionScope, transactionListController: Budgeter.Controllers.transactionListController) {
			this.trans = $scope.trans;
			this.tListState = $scope.listmgr;
			this.index = $scope.index;
			this.expanded = false; 	
			this.tlist = transactionListController;
		}
		
		expand() {
			if(!this.expanded) {
				this.tListState.selectedItem = this.index;
				this.expanded = true;
			} else {
				this.tListState.selectedItem = null;
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
			this.tlist.delete(this.trans,this.index);	
		}
	}
}