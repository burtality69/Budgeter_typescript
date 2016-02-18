///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class authSvc {

		static $inject = ['$http', 'sessionService'];

		private params: ng.IRequestConfig;

		constructor(public $http: ng.IHttpService,
			public sessionService: Services.sessionService) {
		}

		login(loginForm: ILoginModel): ng.IHttpPromise<IAuthToken> {

			var config: ng.IRequestConfig = {
				method: 'POST',
				transformRequest: (obj: Object)=> {
					var str = [];
					for (var p in obj)
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				url: this.sessionService.apiURL + '/token',
				data: { grant_type: "password", userName: loginForm.username, password: loginForm.password },
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;' }
			}
			return this.$http(config);
		}

		register(regForm: IRegistrationModel): ng.IPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'POST',
				url: this.sessionService.apiURL + '/api/Account/register',
				data: regForm,
				headers: { 'Content-Type': 'application/json' },
			}

			return this.$http(config);
		}
	}
}