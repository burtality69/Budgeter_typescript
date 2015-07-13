///<reference path="../../all.d.ts"/>

module Budgeter.Services {
	
	export class transactionMgr {
		
		static $inject = ['$http','sessionService'];
		
		public http: ng.IHttpService;
		public headers: Object;
		public url: string; 
		public sessionService: Budgeter.Services.sessionService;
		
		constructor($http: ng.IHttpService, sessionService: Budgeter.Services.sessionService) {
			this.http = $http;
			this.url = sessionService.apiURL + '/api/transactions'
			this.headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionService.Token}
		}
		
		get(): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {method: 'GET', url: this.url, headers: this.headers};
			return this.http(config);
		}
		
		post(t: ITransactionModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {method: 'POST', url: this.url, headers: this.headers, data: t}
			return this.http(config);
		}
		
		put(t: ITransactionModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {method: 'PUT', url: this.url + '/' + t.ID,
				 headers: this.headers, data: t}
			 return this.http(config);
		}
		
		delete(ID: number): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {method: 'DELETE', url: this.url + '/' + ID,
				headers: this.headers}
			return this.http(config);
		}
	}
}