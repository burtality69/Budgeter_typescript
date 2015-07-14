///<reference path="../../all.d.ts"/>

module Budgeter.Directives {

	export function transactionList(): ng.IDirective {

		return {
			templateUrl: 'Views/Templates/transactionList.html',
			controllerAs: 'tListCtrl',
			controller: Budgeter.Controllers.transactionListController,
			scope: {},
			link: function(scope: ng.IScope, el: JQuery,
                att: ng.IAttributes, ctrl: Budgeter.Controllers.transactionListController) {
				ctrl.refresh();
			}

		}
	}
}

module Budgeter.Controllers {
	
	export interface IListState {addMode: boolean, selectedItem: number}; 
	
	export class transactionListController {
		
		static $inject = ['transactionMgr','notify','$rootScope']; 
		
		rootscope: ng.IRootScopeService;
		listState: IListState; 
		notify: ng.cgNotify.INotifyService; 
		tMgr: Budgeter.Services.transactionMgr;
		transactions: Array<ITransactionModel>
		
		constructor(transactionMgr: Budgeter.Services.transactionMgr, 
			notify: ng.cgNotify.INotifyService,
			$rootScope: ng.IRootScopeService ) {
				
			this.listState = {
				addMode: false, 
				selectedItem: null 
			}
			this.tMgr = transactionMgr; 
			this.notify = notify; 
		}
		
		/** get the list */
		refresh() {
			this.tMgr.get().success(data =>
				this.transactions = data)
				.error((err: Error)=>
					this.notify({message: 'Error loading data',classes: 'alert-danger'})
				)
		}
		
		delete (t: ITransactionModel, idx: number) {
			this.tMgr.delete(t.ID).success(d => {
				this.rootscope.$broadcast('renderChart'); 
				this.notify({message: 'Transaction deleted', classes: 'alert-success'})
				this.transactions.splice(idx,1); 
				this.listState.selectedItem = null; 
			})	
		}
		
		add(t: ITransactionModel) {
			if (t.ID == undefined) {
				this.tMgr.post(t)
					.success(s => {
						this.rootscope.$broadcast('renderChart');
						this.notify({ message: 'Transaction added', classes: 'alert-success' });
						this.transactions.push(s);
						this.listState.addMode = false;
					})
					.error(err =>
						this.notify({ message: err, classes: 'alert-danger' })
						)
			}
			else {
				this.tMgr.put(t).success(r =>
					this.notify({ message: 'Transaction updated', classes: 'alert-success' }))
			}
		}
		
		expandAddForm () {
			this.listState.addMode = true; 
		}
		
		collapseAddForm () {
			this.listState.addMode = false; 
		}
		
		/** should the passed transaction be visible? */
		isVisible (idx: number) {
			var t = this.listState; 
			if (t.addMode) {
				return false;
			} else if (t.selectedItem == null || t.selectedItem == idx) {
				return true
			}
		}
	}
}
	