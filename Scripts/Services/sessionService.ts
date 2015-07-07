///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class sessionService {
		private _token: Object;
		private user: string;
		private _apiURl: string;
		private cookies: ng.cookies.ICookiesService


		static $inject = ['$cookies'];
		constructor($cookies: ng.cookies.ICookiesService) {
			this.cookies = $cookies;
			this._apiURl = 'http://budgeter.azurewebsites.net'
		}

		set Token(token: Object) {
			this.cookies["Authtoken"] = token["access_token"]
		}

		get Token() {
			if (!this.cookies["Authtoken"]) {
				if (!this._token) {
					return undefined;
				}
				this.Token = this._token;
			}
			return this.cookies["Authtoken"];
		};
		
		destroySession() {
			this.cookies.remove('Authtoken');
		}
		
		get apiURL() {
			return this._apiURl;
		}
		
	}
}