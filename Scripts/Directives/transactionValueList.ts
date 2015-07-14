///<reference path="../../all.d.ts"/>

module Budgeter.Directives {
	
	export function transValuesList (): ng.IDirective {
		return {
			restrict: 'EA',
			require: 'transaction',
			replace: true,
			controller: Budgeter.Controllers.transValueListController,
			bindToController: true,
			controllerAs: 'tvListCtrl',
			scope: {list:'='},
		}
	}
}

module Budgeter.Controllers {
	
	export interface ITransactionValueListScope extends ng.IScope {
		liststate: Budgeter.Controllers.ITransValueListState,
		list: Array<ITransactionValueModel>
	}
	
	export class transValueListController {
		
		listState: Budgeter.Controllers.ITransValueListState;
		transactionValues: Array<ITransactionValueModel>
		
		constructor($scope: ITransactionValueListScope ) {
			this.transactionValues = $scope.list;
			this.listState = $scope.liststate;
		}
	}
}

