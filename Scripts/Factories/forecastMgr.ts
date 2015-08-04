///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class forecastMgr {

		static $inject = ['$http', 'sessionService', 'forecastParamSvc'];

		public http: ng.IHttpService;
		public config: ng.IRequestConfig;
		public forecastParams: forecastParamSvc
		public sessionSrv: Budgeter.Services.sessionService;

		constructor($http: ng.IHttpService, sessionService: Budgeter.Services.sessionService,
			forecastParamSvc: Budgeter.Services.forecastParamSvc) {

			this.http = $http;
			this.sessionSrv = sessionService;
			this.forecastParams = forecastParamSvc
			this.config = {
				method: 'GET',
				url: this.sessionSrv.apiURL + '/api/Forecast',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.sessionSrv.Token
				},
				transformResponse: function(data) {
					var dat = JSON.parse(data);
					var ret = [];
					Object.keys(dat).forEach(p=>{
						ret.push(dat[p]); 
					})
					return ret;
				}
			}
		}

		getForecast(): ng.IHttpPromise<any> {
			this.config.params = this.forecastParams.apiParams;
			return this.http(this.config)
		}
	}
}