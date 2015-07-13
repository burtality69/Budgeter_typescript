/* global budgeterDirectives */
budgeterDirectives.directive('transactionList',['ClsTransaction','ClsTransactionValue','transactionMgr','notifications','$rootScope',
function (ClsTransaction,ClsTransactionValue, transactionMgr,notifications,$rootScope) {
	
	return {
		templateUrl: 'Views/Templates/transactionList.html',
		scope: {},
		controllerAs: 'tListCtrl',
		controller: function ($scope) {
			
			var tListCtrl = this;
			 
			this.listmgr = {
		      addMode: false,
		      selecteditem: undefined,
		    };

    		//New Transaction
	    	this.expandAddTransaction= function () {
	        	tListCtrl.listmgr.addMode = true;
			};
			
			//Transaction is visible when (not in add mode and selected) OR (no selection)
			this.visible = function (index) {
				var t = tListCtrl.listmgr;
      			if (t.addMode) {
					  return false; 
				  } else if (t.selecteditem== undefined) {
					  return true;
				  } else if (t.selecteditem == index) {
				  	return true;
				  } 
      		};

		    this.cancelNewTransaction = function () {
		        tListCtrl.listmgr.addMode = false;
		    };

		    //GET
		    var refresh = function () {
		        transactionMgr.get().then(
			        function (response) {
			            tListCtrl.transactions = response.map(ClsTransaction.build);
			        });
		    };
			
			this.deleteTrans = function(trans,index) {
				transactionMgr.delete(trans.ID).then(
					function (success) {
						$rootScope.$broadcast('renderChart');
						notifications.showSuccess({message: 'Transaction deleted successfully'});
						tListCtrl.transactions.splice(index,1);
						tListCtrl.listmgr.selecteditem = undefined;
						$scope.$apply;		
					}, function (error) {
						notifications.showError({message: 'Unable to delete this item'});
					});
			};
			
			this.addTrans = function (trans) {

				if (trans.ID == undefined) {
	              transactionMgr.post(trans).then(
	                function (success) {
	                  $rootScope.$broadcast('renderChart');
	                  notifications.showSuccess({message: 'Task added successfully'});
					  tListCtrl.transactions.push(success);
					  tListCtrl.listmgr.addMode = false;
					  $scope.$apply;
	                }, function(failure) {
	                 notifications.showError({message: failure}); 
	                });
	            } else {
	              transactionMgr.put(trans).then(
	                function (response) {
	                  notifications.showSuccess({message: 'Transaction updated..'})
	                });
	            };
          };
		  
		  this.createNewTv = function(){
			  return new ClsTransactionValue;
		  }
			
		  refresh();
			
		}
		
	};
		
}]);