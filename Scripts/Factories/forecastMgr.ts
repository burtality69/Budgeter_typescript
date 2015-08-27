///<reference path="../../all.d.ts"/>

module Budgeter.Services {
	
	interface IForecastModel {
		transactions: Array<IForecastRowModel>;
		headlines: IBudgetHeadLines
	}
	
	export class forecastMgr {

		static $inject = ['$http', 'sessionService', 'forecastParamSvc','$q','apiFormatSvc'];

		public config: ng.IRequestConfig;

		constructor(public $http: ng.IHttpService, public sessionService: Budgeter.Services.sessionService,
			public forecastParamSvc: Budgeter.Services.forecastParamSvc, public $q: ng.IQService, 
			public apiFormatSvc: apiFormatSvc) {

			this.config = {
				method: 'GET',
				url: this.sessionService.apiURL + '/api/Forecast',
				headers: this.sessionService.httpGetHeaders,
				transformResponse: (data)=> {
					var p = JSON.parse(data);
					return Object.keys(p).map(d=> {
						return p[d];
						}
					)}
			}
		}
		
		/** Return a promise of forecast model {transactions[], headlines} */
		getForecast(): ng.IPromise<IForecastModel> {
			var p = this.$q.defer()
			var ret: IForecastModel = {transactions:undefined, headlines: undefined};
			this.config.params = this.forecastParamSvc.apiParams;
			
			this.$http(this.config)
				.then((response:any)=>{
					// Convert the rowmodels  
					ret.transactions = response.data.map(f => 
						this.apiFormatSvc.forecastRowModelToClientFormat(f)
					);
					
					ret.headlines = this.rollupHeadlines(response.data);
					
					p.resolve(ret);
				}) 
				
				.catch(error=>{
					p.reject(error)
				})
				
				return p.promise;
		}
		
		/** Takes a forecast and summarises it into headlines  */
		private rollupHeadlines(data: Array<any>): IBudgetHeadLines {
			var lastrow = data[data.length -1];
			var headlines: IBudgetHeadLines = {balance:0,savings:0,incoming:0,outgoing:0}
			
			for (var i = 0; i < data.length; i++) {
						headlines.incoming += Math.abs(data[i].total_payments);
						headlines.outgoing += data[i].total_deductions;
			}
			
			headlines.balance = lastrow.balance;
			headlines.savings = lastrow.savings;
			
			return headlines;
		}
	}
}