///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class transactionMgr {

		static $inject = ['$http', 'sessionService','apiFormatSvc'];

		public http: ng.IHttpService;
		public url: string;
		public sessionService: Budgeter.Services.sessionService;
		formatter: Budgeter.Services.apiFormatSvc;

		constructor($http: ng.IHttpService, sessionService: Budgeter.Services.sessionService,
			apiFormatSvc: Budgeter.Services.apiFormatSvc) {
			this.http = $http;
			this.url = sessionService.apiURL + '/api/transactions'
			this.formatter = apiFormatSvc;
			this.sessionService = sessionService;
		}

		get(): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'GET',
				url: this.url,
				headers: this.sessionService.httpGetHeaders
			};
			return this.http(config);
		}
		
		/**Post a single transaction model */
		post(t: ITransactionModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'POST',
				url: this.url,
				headers: this.sessionService.httpGetHeaders,
				data: this.formatter.transtoServerFmt(t)
			}
			return this.http(config);
		}
		
		/**Update an existing transaction model */
		put(t: ITransactionModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'PUT',
				url: this.url + '/' + t.ID,
				headers: this.sessionService.httpGetHeaders,
				data: this.formatter.transtoServerFmt(t)
			}
			return this.http(config);
		}

		delete(ID: number): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'DELETE',
				url: this.url + '/' + ID,
				headers: this.sessionService.httpGetHeaders
			}
			return this.http(config);
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
