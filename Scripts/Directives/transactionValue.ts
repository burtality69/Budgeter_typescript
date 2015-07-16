///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {
	
	export interface ITransactionValueScope extends ng.IScope {
		tv: ITransactionValueModel,
		liststate: ITransValueListState
	}
	
	export class transactionValueController {
		
		liststate: ITransValueListState;
		tv: ITransactionValueModel; 
		
		constructor($scope: ITransactionValueScope) {
		}
		
		edit() {
			this.liststate.tvToEdit = this.tv;
			this.liststate.addEdit = true;
		}
	}
}

module Budgeter.Directives {
	
	export function transactionValue (): ng.IDirective {
		
		return{
			restrict: 'EA',
			scope: {tv: '=', liststate:'='},
			replace: true,
			controllerAs: 'tvCtrl',
			bindToController: true,
			controller: Budgeter.Controllers.transactionValueController,
			templateUrl: 'Views/Templates/transactionValue.html'
		}
	}
}
