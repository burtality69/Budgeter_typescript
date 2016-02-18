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

		static $inject = ['trxDataService', 'listOptionsDataSvc', 'notify'];

		private newrecord: boolean;
		public expanded: boolean;
		public trans: ITransactionModel;
		public liststate: Budgeter.Controllers.IListState;
		public listSvc: Budgeter.Services.listOptionsDataSvc;
		public types: Array<string>;
		public frequencies: Array<string>;

		constructor(public trxDataService: Services.trxDataService,
			public listOptionsDataSvc: Services.listOptionsDataSvc,
			public notify: ng.cgNotify.INotifyService) {

			this.listSvc = listOptionsDataSvc;
			this.gettransactiontypes();
			this.gettransactionvalues();

			if (this.liststate.transactionToEdit == undefined) {
				this.trans = this.trxDataService.newBlankTrans();
				this.newrecord = true;
			} else {
				this.trans = this.liststate.transactionToEdit;
				this.newrecord = false;
			}

		}

		gettransactiontypes() {
			this.listSvc.transactionfrequencies
				.then(data =>
					this.frequencies = data
				)
				.catch(e =>
					this.notify({ message: 'Error loading data: ' + e, classes: 'alert-danger' })
				)
		}

		gettransactionvalues() {
			this.listSvc.transactiontypes
				.then(data =>
					this.types = data
				)
				.catch(e =>
					this.notify({ message: 'Error loading data: ' + e, classes: 'alert-danger' })
				)
		}

		expandToggle() {
			if (!this.expanded) {
				this.expanded = true;
				this.liststate.addMode = true;
			} else {
				this.expanded = false;
				this.liststate.addMode = false;
			}
		}

		clear() {
			this.trans = this.trxDataService.newBlankTrans()
		}

		cancel() {
			this.liststate.addMode = false;
		}

		submit() {

			if (this.newrecord) {
				this.trxDataService.post(this.trans)
					.then(t => {
						this.notify({ message: 'Item created successfully: ', classes: 'alert-success' })
						this.liststate.addMode = false;
					})
					.catch(e => {
						this.notify({ message: 'There was a problem submitting this item: ' + e, classes: 'alert-danger' })
					})
			} else {
				this.trxDataService.put(this.trans)
					.then(t => {
						this.notify({ message: 'Item updated successfully: ', classes: 'alert-success' })
						this.liststate.addMode = false;
					})
					.catch(e => {
						this.notify({ message: 'There was a problem updating this item: ' + e, classes: 'alert-danger' })
					})
			}
		}

	}
}