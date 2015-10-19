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

	export interface IListState { addMode: boolean, selectedItem: number; transactionToEdit: ITransactionModel };

	export class transactionListController {

		static $inject = ['transactionMgr', 'transactionValueMgr', 'notify', '$rootScope', 'apiFormatSvc'];

		public listState: IListState;
		public transactions: Array<ITransactionModel>;

		constructor(public transactionMgr: Budgeter.Services.transactionMgr,
			public notify: ng.cgNotify.INotifyService,
			public $rootScope: ng.IRootScopeService,
			public transactionValueMgr: Budgeter.Services.transactionValueMgr,
			public apiFormatSvc: Budgeter.Services.apiFormatSvc) {

			this.listState = {
				addMode: false,
				selectedItem: null,
				transactionToEdit: null
			};
		}
		
		/** get the list */
		refresh() {
			this.transactionMgr.get()
				.then((data: ITransactionServerModel[]) => {
					this.transactions = data.map(d => {
						return this.apiFormatSvc.transtoClientFmt(d)
					})
				})
				.catch((err: Error) => {
					this.notify({ message: 'Error loading data', classes: 'alert-danger' })
				})
		}

		delete(t: ITransactionModel, idx: number) {
			this.transactionMgr.delete(t.ID)
				.then(d => {
					this.$rootScope.$broadcast('renderChart');
					this.notify({ message: 'Transaction deleted', classes: 'alert-success' })
					this.transactions.splice(idx, 1);
					this.listState.selectedItem = null;
				})
				.catch(e=> {
					this.notify({ message: 'There was a problem deleting the item ' + e, classes: 'alert-danger' })
				})
		}

		add(t: ITransactionModel) {
			if (t.ID == undefined) {
				this.transactionMgr.post(t)
					.then(s => {
						this.$rootScope.$broadcast('renderChart');
						this.notify({ message: 'Transaction added', classes: 'alert-success' });
						this.transactions.push(s);
						this.listState.addMode = false;
					})
					.catch(err =>
						this.notify({ message: err, classes: 'alert-danger' })
					)
			}
			else {
				this.transactionMgr.put(t)
					.then(r => {
						this.notify({ message: 'Transaction updated', classes: 'alert-success' })
					})
					.catch(e=>{
						this.notify({message: 'There was a problem updating the item ' + e, classes: 'alert-danger'})
					})
			}
		}

		toggleAddForm() {
			this.listState.addMode = !this.listState.addMode;
		}
		
		/** should the passed transaction be visible? */
		isVisible(idx: number) {
			var t = this.listState;
			if (t.addMode) {
				return false;
			} else if (t.selectedItem == null || t.selectedItem == idx) {
				return true
			}
		}
	}
}




	