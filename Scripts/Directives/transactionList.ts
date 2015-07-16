///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {
	
	export interface IListState {addMode: boolean, selectedItem: number; transactionToEdit: ITransactionModel}; 
	
	export class transactionListController {
		
		static $inject = ['transactionMgr','transactionValueMgr','notify','$rootScope']; 
		
		rootscope: ng.IRootScopeService;
		listState: IListState; 
		notify: ng.cgNotify.INotifyService; 
		tMgr: Budgeter.Services.transactionMgr;
		transactions: Array<ITransactionModel>
		tvMgr: Budgeter.Services.transactionValueMgr;
		
		constructor(transactionMgr: Budgeter.Services.transactionMgr, 
			notify: ng.cgNotify.INotifyService,
			$rootScope: ng.IRootScopeService, transactionValueMgr: Budgeter.Services.transactionValueMgr ) {
				
			this.listState = {
				addMode: false, 
				selectedItem: null,
				transactionToEdit: null 
			};
			
			this.tMgr = transactionMgr; 
			this.tvMgr = transactionValueMgr;
		}
		
		/** get the list */
		refresh() {
			this.tMgr.get().success((data: Array<ITransactionServerModel>) => {
				
				this.transactions = data.map(d => {
					return this.tMgr.transtoClientModel(d)
				})
			})
				.error((err: Error)=> {
					this.notify({message: 'Error loading data',classes: 'alert-danger'})
				})
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

		toggleAddForm() {
			this.listState.addMode = !this.listState.addMode;
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


	