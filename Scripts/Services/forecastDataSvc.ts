///<reference path="../../all.d.ts"/>

module Budgeter.Services {
	
	interface IForecastModel {
		transactions: Array<IForecastRowModel>;
		headlines: IBudgetHeadLines
	}
	
	export class forecastDataSvc {

		static $inject = ['$http', 'sessionService', 'forecastParamSvc','$q','apiFormatSvc'];

		constructor(public $http: ng.IHttpService, public sessionService: Budgeter.Services.sessionService,
			public forecastParamSvc: Budgeter.Services.forecastParamSvc, public $q: ng.IQService, 
			public apiFormatSvc: apiFormatSvc) {
		}
		
		/** Return a promise of forecast model {transactions[], headlines} */
		getForecast(): ng.IPromise<IForecastModel> {
			
			var baseUrl = this.sessionService.apiURL + '/api/Forecast';
			var config  = {
				method: 'GET',
				url: baseUrl,
				headers: this.sessionService.httpGetHeaders,
				data: '',
				transformResponse: (data)=> {
					var p = JSON.parse(data);
					return Object.keys(p).map(d=> {
						return p[d];
						}
					)}
			}
			
			var p = this.$q.defer()
			
			var ret: IForecastModel = {transactions:undefined, headlines: undefined};
			config.url = baseUrl + this.forecastParamSvc.queryString;
			config.headers = this.sessionService.httpGetHeaders;
			
			this.$http(config)
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
			var incoming: number = 0; 
			var outgoing: number = 0;
			var bal = lastrow.balance;
			var sav = lastrow.savings; 
			
			for (var i = 0; i < data.length; i++) {
						incoming += Math.abs(data[i].total_payments);
						outgoing += data[i].total_deductions;
			}
			
			var headlines: IBudgetHeadLines= {
				balance: bal,
				savings: sav, 
				incoming: incoming, 
				outgoing: outgoing
			}; 
						
			return headlines;
		}
		
		getBudget(): ng.IPromise<iBudgetRowModel> {
			
			var baseUrl = this.sessionService.apiURL + '/api/Forecast/getbudget';
			var config  = {
				method: 'GET',
				url: baseUrl,
				headers: this.sessionService.httpGetHeaders,
				data: '',
				transformResponse: (data)=> {
					var p = JSON.parse(data);
					return Object.keys(p).map(d=> {
						return p[d];
						}
					)}
			}
			
			return this.$http(config);
				
		}
	}
}