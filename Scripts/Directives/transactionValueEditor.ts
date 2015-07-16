///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {
	
	
	export class transactionValueEditorCtrl {
		
		static $inject = ['transactionValueMgr','cgNotify','$rootScope','listOptionsDataSvc'];
		listOptions: Budgeter.Services.listOptionsDataSvc;
		tv: ITransactionValueModel; 
		transactionValueMgr: Budgeter.Services.transactionValueMgr;
		frequencies: Array<string>;
		notify: ng.cgNotify.INotifyService;
		newitem: boolean;
		liststate: ITransValueListState;
		
		constructor($scope: Budgeter.Controllers.ITransactionValueListScope){
			
			if ($scope.liststate.tvToEdit != undefined) {
				this.tv = $scope.liststate.tvToEdit;
				this.newitem = true; 
			} else {
				this.tv = this.transactionValueMgr.getnewTransactionValue();
				this.newitem = false; 
			}
			
			this.getfrequencies();		
		}
		
		getfrequencies() {
			this.listOptions.transactionfrequencies
				.success(d => {
					this.frequencies = d;
				})
				.error(e => {
					this.notify({ message: 'There was a problem loading data', classes: 'alert-danger' })
				})
		}
		
		/** either post or put a transactionvalue depending on values in liststate */
		submit() {
			if (this.newitem) {
				this.transactionValueMgr.post(this.tv)
					.success(d=> {
						this.notify({ message: 'Item created successfully', classes: 'alert-success' })
					})
					.error(e=> {
						this.notify({ message: 'There was a problem submitting the item', classes: 'alert-danger' })
					});
			} else {
				this.transactionValueMgr.put(this.tv)
					.success(d=> {
						this.notify({ message: 'Item created successfully', classes: 'alert-success' })
					})
					.error(e=> {
						this.notify({ message: 'There was a problem submitting the item', classes: 'alert-danger' })
					});
			}
		}
		
		cancel() {
			this.liststate.addEdit = false;
		}
		
		delete() {
			this.transactionValueMgr.delete(this.tv.ID)
				.success(d=> {
					this.notify({message: 'Item deleted successfully',classes: 'alert-success'})
				})
				.error(e=> {
					this.notify({message: 'Error' + e ,classes: 'alert-danger'})
				})
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