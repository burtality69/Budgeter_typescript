///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class transactionValueMgr {

		static $inject = ['$http', 'sessionService','apiFormatSvc'];

		url: string;
		http: ng.IHttpService;
		sessionService: Budgeter.Services.sessionService;
		formatter: Budgeter.Services.apiFormatSvc;

		constructor($http: ng.IHttpService, sessionService: Budgeter.Services.sessionService,
			apiFormatSvc: Budgeter.Services.apiFormatSvc) {

			this.http = $http;
			this.url = sessionService.apiURL + '/api/transactionValues'
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
		
		post(t: ITransactionValueClientModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'POST',
				url: this.url,
				headers: this.sessionService.httpGetHeaders,
				data: this.formatter.tvtoServerFmt(t)		
			};

			return this.http(config);
		}
		
		put(t: ITransactionValueClientModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'PUT',
				url: this.url + '/' + t.ID,
				headers: this.sessionService.httpGetHeaders,
				data: this.formatter.tvtoServerFmt(t)				
			}
			
			return this.http(config); 
		}
		
		delete(ID: number): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'DELETE',
				url: this.url + '/' + ID,
				headers: this.sessionService.httpGetHeaders,
			}
			
			return this.http(config); 
		}
				
		getnewTransactionValue(): ITransactionValueClientModel {
			return {
				ID: undefined,
				TransactionID: undefined,
				Value: undefined,
				FrequencyID: undefined,
				FrequencyDescription: undefined,
				Day: undefined,
				Start_date: undefined,
				End_date: undefined
			}
		}
	}
}