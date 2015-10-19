///<reference path="../../all.d.ts"/>

module Budgeter.Directives {
	
	export function transValuesList (): ng.IDirective {
		return {
			restrict: 'EA',
			require: 'transaction',
			templateUrl: 'Views/Templates/transactionValueList.html',
			replace: true,
			controller: Budgeter.Controllers.transValueListController,
			bindToController: true,
			controllerAs: 'tvListCtrl',
			scope: {transactionValues:'=', listState: '='},
		}
	}
}


module Budgeter.Controllers {
	
	export interface ITransactionValueListScope extends ng.IScope {
		listState: Budgeter.Controllers.ITransValueListState,
		list: Array<ITransactionValueClientModel>
	}
	
	export class transValueListController {
		
		public listState: Budgeter.Controllers.ITransValueListState;
		public transactionValues: Array<ITransactionValueClientModel>
		
		constructor() {
		}
		
		addNew() {
			this.listState.addEdit = true;
		}
		
	}
}


