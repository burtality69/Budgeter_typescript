///<reference path="../../all.d.ts"/>

module Budgeter.Services {
	
	export class listOptionsDataSvc {
		
		static $inject = ['sessionService','$http'];
				
		constructor(public sessionService: Budgeter.Services.sessionService, public $http: ng.IHttpService) {
		}
		
		get transactiontypes(): ng.IPromise<string[]> {
			
			var config: ng.IRequestConfig = {
				method: 'GET',
				url: this.sessionService.apiURL + '/api/admin/transactiontypes',
				headers: this.sessionService.httpGetHeaders,
			}
			
			return this.$http(config)				
		}
		
		get transactionfrequencies(): ng.IPromise<string[]> {
			
			var config: ng.IRequestConfig ={
				method: 'GET',
				url: this.sessionService.apiURL + '/api/admin/transactionfrequencies',
				headers: this.sessionService.httpGetHeaders
			}
			return this.$http(config);
		}
	}
}