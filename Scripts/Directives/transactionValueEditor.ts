///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {
	
	
	export class transactionValueEditorCtrl {
		
		static $inject = ['transactionValueMgr','notify','$rootScope','listOptionsDataSvc'];
		
		listOptionsDataSvc: Budgeter.Services.listOptionsDataSvc;
		tv: ITransactionValueClientModel; 
		transactionValueMgr: Budgeter.Services.transactionValueMgr;
		frequencies: Array<string>;
		notify: ng.cgNotify.INotifyService;
		newitem: boolean;
		listState: ITransValueListState;
		transactionID: number;
		
		constructor(transactionValueMgr: Budgeter.Services.transactionValueMgr, notify: ng.cgNotify.INotifyService 
			,$rootscope: ng.IRootScopeService,listOptionsDataSvc: Budgeter.Services.listOptionsDataSvc){
			
			this.listOptionsDataSvc = listOptionsDataSvc;
			this.notify = notify; 
			this.transactionValueMgr = transactionValueMgr;
			
			if (this.listState.tvToEdit != undefined) {
				this.tv = this.listState.tvToEdit;
				this.newitem = false;
			} else {
				this.tv = this.transactionValueMgr.getnewTransactionValue();
				this.tv.ID = this.transactionID;
				this.newitem = true;
			}
			
			this.getfrequencies();		
		}
		
		getfrequencies() {
			this.listOptionsDataSvc.transactionfrequencies
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
					.error((e:Error)=> {
						this.notify({ message: 'There was a problem submitting the item: ' + e.message, classes: 'alert-danger' })
					});
			} else {
				this.transactionValueMgr.put(this.tv)
					.success(d=> {
						this.notify({ message: 'Item created successfully', classes: 'alert-success' })
					})
					.error((e:Error)=> {
						this.notify({ message: 'There was a problem submitting the item: ' + e.message, classes: 'alert-danger' })
					});
			}
		}
		
		cancel() {
			this.listState.addEdit = false;
			this.listState.tvToEdit = this.transactionValueMgr.getnewTransactionValue();
		}
		
		delete() {
			this.transactionValueMgr.delete(this.tv.ID)
				.success(()=> {
					this.notify({message: 'Item deleted successfully',classes: 'alert-success'})
				})
				.error((e: Error)=> {
					this.notify({message: 'Error' + e.message ,classes: 'alert-danger'})
				})
		}
	}
}
module Budgeter.Directives {
	export function transactionValueEditor(): ng.IDirective {
		return {
			restrict: 'EA',
			scope: {listState: '=',transactionID: '='},
			require: '^transaction',
			controllerAs: 'tvEditCtrl',
			bindToController: true,
			controller: Budgeter.Controllers.transactionValueEditorCtrl,
			templateUrl: 'Views/Templates/TransactionValueEditor.html'
		}
	}
}