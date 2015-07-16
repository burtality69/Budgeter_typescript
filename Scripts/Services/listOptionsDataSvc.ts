///<reference path="../../all.d.ts"/>

module Budgeter.Services {
	
	export class listOptionsDataSvc {
		
		static $inject = ['sessionService','$http'];
		_transactionfrequencies: string;
		_transactiontypes: string;
		sessionService: Budgeter.Services.sessionService;
		http: ng.IHttpService;
		
		constructor(sessionService: Budgeter.Services.sessionService, $http: ng.IHttpService) {
			this.http = $http;
			this.sessionService = sessionService;
		}
		
		get transactiontypes(): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'GET',
				url: this.sessionService.apiURL + '/api/admin/transactiontypes',
				headers: this.sessionService.httpGetHeaders,
			}
			return this.http(config);
		}
		
		get transactionfrequencies(): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig ={
				method: 'GET',
				url: this.sessionService.apiURL + '/api/admin/transactionfrequencies',
				headers: this.sessionService.httpGetHeaders
			}
			return this.http(config);
		}
	}
}