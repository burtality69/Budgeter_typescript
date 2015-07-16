///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {
	
	
	export class transactionValueEditorCtrl {
		
		static $inject = ['transactionValueMgr','notify','$rootScope','listOptionsDataSvc'];
		listOptions: Budgeter.Services.listOptionsDataSvc;
		tv: ITransactionValueModel; 
		transactionValueMgr: Budgeter.Services.transactionValueMgr
		
		constructor($scope: Budgeter.Controllers.ITransactionValueListScope){
			
			if ($scope.liststate.tvToEdit != undefined) {
				this.tv = $scope.liststate.tvToEdit;
			} else {
				this.tv = this.transactionValueMgr.getnewTransactionValue();
			}
				
		}
		
		getfrequencies(){
			this
		}
	}
}
module Budgeter.Directives {
	export function transactionValueEditor(): ng.IDirective {
		return {
			restrict: 'EA',
			scope: {listState: '='},
			require: '^transaction',
			controllerAs: 'tvEditCtrl',
			bindToController: true,
			controller: Budgeter.Controllers.transactionValueEditorCtrl,
			templateUrl: 'Views/Templates/TransactionValueEditor.html'
		}
	}
}