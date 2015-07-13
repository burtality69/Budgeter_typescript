///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class transactionValueMgr {

		static $inject = ['$http', 'sessionService'];

		headers: Object;
		url: string;
		http: ng.IHttpService;
		sessionService: Budgeter.Services.sessionService;

		constructor($http: ng.IHttpService, sessionService: Budgeter.Services.sessionService) {

			this.http = $http;
			this.url = sessionService.apiURL + '/api/transactionValues'
			this.headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionService.Token }

		}
		
		get(): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'GET',
				url: this.url,
				headers: this.headers
			};

			return this.http(config);
		}
		
		post(t: ITransactionValueModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'POST',
				url: this.url,
				headers: this.headers,
				data: t
			};

			return this.http(config);
		}
		
		put(t: ITransactionValueModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'PUT',
				url: this.url + '/' + t.ID,
				headers: this.headers,
				data: t				
			}
			
			return this.http(config); 
		}
		
		delete(ID: number): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'DELETE',
				url: this.url + '/' + ID,
				headers: this.headers,
			}
			
			return this.http(config); 
		}
		
		formatForAPI (t: ITransactionValueModel) {
			return {}
		}
	}
}