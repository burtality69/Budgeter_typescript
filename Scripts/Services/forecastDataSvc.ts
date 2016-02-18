///<reference path="../../all.d.ts"/>

module Budgeter.Services {
	
	interface IForecastModel {
		transactions: Array<IForecastRowModel>;
		headlines: IBudgetHeadLines
	}
	
	export class forecastDataSvc {

		static $inject = ['$http', 'sessionService', 'forecastParamSvc','apiFormatSvc'];

		constructor(public $http: ng.IHttpService, public sessionService: Services.sessionService,
			public forecastParamSvc: Services.forecastParamSvc,
			public apiFormatSvc: apiFormatSvc) {
		}
		
		/** Return a promise of forecast model {transactions[], headlines} */
		getForecast(): Promise<IForecastModel> {
			
			let baseUrl = this.sessionService.apiURL + '/api/Forecast';
			let config  = {
				method: 'GET',
				url: baseUrl,
				headers: this.sessionService.httpGetHeaders,
				data: '',
				transformResponse: (data)=> {
					let p = JSON.parse(data);
					return Object.keys(p).map(d=> {return p[d];})
				}
			}
			
			let ret: IForecastModel = {transactions:undefined, headlines: undefined};
			config.url = baseUrl + this.forecastParamSvc.queryString;
			config.headers = this.sessionService.httpGetHeaders;
			
			return new Promise((resolve,reject)=>{
                this.$http(config)
                    .then((response:any)=>{
                        ret.transactions = response.data.map(f => this.apiFormatSvc.forecastRowModelToClientFormat(f));
                        
                        ret.headlines = this.rollupHeadlines(response.data);
                        
                        resolve(ret);
                    }) 
                    
                    .catch(error=>{
                        reject(error)
                    })
                    
                    })
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
		
		getBudget(): ng.IHttpPromise<iBudgetRowModel> {
			
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