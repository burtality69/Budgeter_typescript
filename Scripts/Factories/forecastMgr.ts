///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class forecastMgr {

		private http: ng.IHttpService;
		private config: ng.IRequestConfig;
		private sessionSrv: sessionService; 

		static $inject = ['$http', 'sessionService'];

		constructor($http: angular.IHttpService, sessionService: sessionService) {
			this.http = $http;
			this.sessionSrv = sessionService; 
			this.config = {
				method: 'GET',
				url: this.sessionSrv.apiURL + '/api/Forecast?',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + sessionService.Token
				}
			}
		}

		private buildQuery(params: IBudgetParams) {
			var qs: string = JSON.stringify(params); 
			this.config.url = this.config.url + qs;
		}

		getForecast(forecastParams: IBudgetParams): ng.IPromise<any> {
			this.buildQuery(forecastParams); 
			return this.http(this.config)
		}
	}
}