///<reference path="../../all.d.ts"/>

module Budgeter.Factories {
	
	export class authFactory {
		
		static $inject = ['$http','sessionService']
		private params: ng.IRequestConfig;
		private http: ng.IHttpService; 
		private sessionSrv: Budgeter.Services.sessionService;
		
		constructor($http: ng.IHttpService, sessionService: Budgeter.Services.sessionService) {
			this.http = $http; 
			this.sessionSrv = sessionService; 
		}
		
		login(username: string, password: string): ng.IHttpPromise<any> {

			var config: ng.IRequestConfig = {
				method: 'POST',
				url: this.sessionSrv.apiURL + '/token',
				data: { grant_type: "password", userName: username, password: password },
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;' }
			}
			return this.http(config);
		}
		
		register (regForm: IRegistrationModel): ng.IPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'POST',
				url: this.sessionSrv.apiURL + '/api/Account/register',
				data: regForm,
				headers: {'Content-Type': 'application/json'},				
			}
			
			return this.http(config);
		}
	}
}