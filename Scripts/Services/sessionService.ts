///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class sessionService {
		static $inject = ['$cookies'];
		
		private user: string;
		private _apiURl: string;
		public cookies: ng.cookies.ICookiesService

		constructor($cookies: ng.cookies.ICookiesService) {
			this.cookies = $cookies;
			this._apiURl = 'http://budgeter.azurewebsites.net'
		}

		set Token(token: string) {
			this.cookies.put('authToken',token); 
		}

		get Token(): string {
			if (!this.cookies.get('authToken')) {
					return undefined;
				}	
			return this.cookies.get('authToken');	
		};
		
		
		destroySession() {
			this.cookies.remove('Authtoken');
		}
		
		get apiURL() {
			return this._apiURl;
		}
		
	}
}