budgeterDirectives.directive('transactionValueList',['ClsTransactionValue','TransactionValueMgr', function() {
	return {
		restrict: 'EA',
		require: '^transaction',
		replace: true,
		scope: {list: '='},
		controllerAs: 'tvListController',
		controller: function() {				

		}
	};
	
}])