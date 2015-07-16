///<reference path ="../../all.d.ts"/>

module Budgeter.Directives {
	export function transactionEditor(): ng.IDirective {
		return {
			restrict: 'EA',
			require: '^transactionList',
			scope: {
				trans: '=',
				liststate: '='
			},
			templateUrl: '/Views/Templates/TransactionEditor.html',
			bindToController: true,
			controllerAs: 'transEditCtrl',
			controller: Budgeter.Controllers.transactionEditorController
		}
	}
}

module Budgeter.Controllers {
	
	export class transactionEditorController {
		
		static $inject =['transactionMgr','listOptionsDataSvc', 'notify'];
		
		newrecord: boolean;
		expanded: boolean;
		trans: ITransactionModel;
		liststate: Budgeter.Controllers.IListState;
		listSvc: Budgeter.Services.listOptionsDataSvc;
		types: Array<string>;
		frequencies: Array<string>;
		notify: ng.cgNotify.INotifyService;
		transactionMgr: Budgeter.Services.transactionMgr;
		
		constructor(transactionMgr: Budgeter.Services.transactionMgr,
			listOptionsDataSvc: Budgeter.Services.listOptionsDataSvc,
			notify: ng.cgNotify.INotifyService) {
			
			this.transactionMgr = transactionMgr; 
			this.listSvc = listOptionsDataSvc;
			this.notify = notify;
			this.gettransactiontypes();
			this.gettransactionvalues();
			
			if (this.liststate.transactionToEdit == undefined) {
				this.trans = this.transactionMgr.newBlankTrans();
				this.newrecord = true;
			} else {
				this.trans = this.liststate.transactionToEdit;
				this.newrecord = false;
			}
			
		}
		
		gettransactiontypes() {
			this.listSvc.transactionfrequencies.success(data =>
				this.frequencies = data
				)
				.error(e =>
					this.notify({message: 'Error loading data: ' + e,classes: 'alert-danger'})
				)
		}
		
		gettransactionvalues() {
			this.listSvc.transactiontypes.success(data =>
				this.types = data
				)
				.error(e =>
					this.notify({message: 'Error loading data: ' + e,classes: 'alert-danger'})
				)
		}
		
		expandToggle() {
			if (!this.expanded) {
				this.expanded = true; 
				this.liststate.addMode = true;
			} else {
				this.expanded=false;
				this.liststate.addMode = false; 
			}
		}
		
		clear() {
			this.trans = this.transactionMgr.newBlankTrans()
		}
		
		cancel() {
			this.liststate.addMode = false;
		}
		
		submit() {
			
			if(this.newrecord) {
				this.transactionMgr.post(this.trans)
				.success(t => {
					this.notify({message: 'Item created successfully: ', classes: 'alert-success'})
					this.liststate.addMode = false; 
				})
				.error(e => {
					this.notify({message: 'There was a problem submitting this item: ' + e,classes: 'alert-danger'})
				})
			} else {
				this.transactionMgr.put(this.trans)
				.success(t => {
					this.notify({message: 'Item updated successfully: ', classes: 'alert-success'})
					this.liststate.addMode = false;
				})
				.error(e => {
					this.notify({message: 'There was a problem updating this item: ' + e,classes: 'alert-danger'})
				})
			}
			//this.transactionMgr.post(this.trans)
			//.success(t => )
		}
		
	}
}