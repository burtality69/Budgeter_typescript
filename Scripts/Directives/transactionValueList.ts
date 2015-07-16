///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {
	
	export interface ITransactionValueListScope extends ng.IScope {
		listState: Budgeter.Controllers.ITransValueListState,
		list: Array<ITransactionValueClientModel>
	}
	
	export class transValueListController {
		
		static $inject = ['$scope'];
		
		listState: Budgeter.Controllers.ITransValueListState;
		transactionValues: Array<ITransactionValueClientModel>
		
		constructor($scope: ITransactionValueListScope ) {
			this.listState = {tvToEdit: null, addEdit: false}
		}
		
	}
}

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
			scope: {transactionValues:'='},
		}
	}
}

