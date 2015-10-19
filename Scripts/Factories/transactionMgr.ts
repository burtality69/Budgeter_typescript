///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class transactionMgr {

		static $inject = ['$http', 'sessionService','apiFormatSvc'];
		public url: string;

		constructor(public $http: ng.IHttpService, public sessionService: Budgeter.Services.sessionService,
			public apiFormatSvc: Budgeter.Services.apiFormatSvc) {
				
			this.url = sessionService.apiURL + '/api/transactions'
		}

		get(): ng.IHttpPromise<Array<ITransactionServerModel>> {
			var config: ng.IRequestConfig = {
				method: 'GET',
				url: this.url,
				headers: this.sessionService.httpGetHeaders
			};
			return this.$http(config);
		}
		
		/**Post a single transaction model */
		post(t: ITransactionModel): ng.IPromise<ITransactionModel> {
			var config: ng.IRequestConfig = {
				method: 'POST',
				url: this.url,
				headers: this.sessionService.httpGetHeaders,
				data: this.apiFormatSvc.transtoServerFmt(t)
			}
			return this.$http(config);
		}
		
		/**Update an existing transaction model */
		put(t: ITransactionModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'PUT',
				url: this.url + '/' + t.ID,
				headers: this.sessionService.httpGetHeaders,
				data: this.apiFormatSvc.transtoServerFmt(t)
			}
			return this.$http(config);
		}

		delete(ID: number): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'DELETE',
				url: this.url + '/' + ID,
				headers: this.sessionService.httpGetHeaders
			}
			return this.$http(config);
		}

		newBlankTrans(): ITransactionModel {
			return {
				ID: undefined,
				Name: undefined,
				TypeID: undefined,
				UserID: undefined,
				TypeDescription: undefined,
				TransactionValues: []
			}
		}

	}
}
