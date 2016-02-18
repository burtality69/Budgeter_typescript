///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class trxdetailDataSvc {

		static $inject = ['$http', 'sessionService','apiFormatSvc'];

		private url: string;

		constructor(private $http: ng.IHttpService, private sessionService: Services.sessionService,
			private apiFormatSvc: Services.apiFormatSvc) {
				
			this.url = sessionService.apiURL + '/api/transactionValues'

		}
		
		get(): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'GET',
				url: this.url,
				headers: this.sessionService.httpGetHeaders
			};

			return this.$http(config);
		}
		
		post(t: ITransactionValueClientModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'POST',
				url: this.url,
				headers: this.sessionService.httpGetHeaders,
				data: this.apiFormatSvc.tvtoServerFmt(t)		
			};

			return this.$http(config);
		}
		
		put(t: ITransactionValueClientModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'PUT',
				url: this.url + '/' + t.ID,
				headers: this.sessionService.httpGetHeaders,
				data: this.apiFormatSvc.tvtoServerFmt(t)				
			}
			
			return this.$http(config); 
		}
		
		delete(ID: number): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'DELETE',
				url: this.url + '/' + ID,
				headers: this.sessionService.httpGetHeaders,
			}
			
			return this.$http(config); 
		}
				
		getnewTransactionValue(TransactionID: number): ITransactionValueClientModel {
			return {
				ID: undefined,
				TransactionID: TransactionID,
				Value: undefined,
				FrequencyID: undefined,
				FrequencyDescription: undefined,
				Day: undefined,
				Start_date: undefined,
				End_date: undefined,
				include: true
			}
		}
	}
}