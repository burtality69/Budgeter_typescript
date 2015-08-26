///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class sessionService {
		static $inject = ['$cookies'];
		
		private user: string;
		public _apiURl: string;

		constructor(public $cookies: ng.cookies.ICookiesService) {
			this._apiURl = 'http://budgeter.azurewebsites.net'
			//this._apiURl = 'http://localhost:52243/'
		}

		set Token(token: string) {
			this.$cookies.put('authToken',token); 
		}

		get Token(): string {
			if (!this.$cookies.get('authToken')) {
					return undefined;
				}	
			return this.$cookies.get('authToken');	
		};
		
		/**Delete the current session, purge cookies */
		destroySession() {
			this.$cookies.remove('authToken');
		}
		
		get apiURL() {
			return this._apiURl;
		}
		
		get httpGetHeaders(): Object {
			return {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.Token };
		}
		
		get httpPostHeaders(): Object {
			return {};
		}
		
	}
}