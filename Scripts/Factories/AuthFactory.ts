///<reference path="../../all.d.ts"/>

module Budgeter.Services {
	
	export class authFactory {
		
		static $inject = ['$http','sessionService'];
		
		private params: ng.IRequestConfig;
		public http: ng.IHttpService; 
		public sessionSrv: Budgeter.Services.sessionService;
		
		constructor($http: ng.IHttpService, sessionService: Budgeter.Services.sessionService) {
			this.http = $http; 
			this.sessionSrv = sessionService; 
		}
		
		login(loginForm: ILoginModel): ng.IHttpPromise<any> {

			var config: ng.IRequestConfig = {
				method: 'POST',
				transformRequest: function(obj: Object) {
		          var str = [];
		          for(var p in obj)
		          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		          return str.join("&");
		        },
				url: this.sessionSrv.apiURL + '/token',
				data: {grant_type: "password", userName: loginForm.username, password: loginForm.password },
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