///<reference path="../../all.d.ts"/>

module Budgeter.Services {
	
	export class listOptionsDataSvc {
		
		static $inject = ['sessionService','$http'];
        public trxTypes: string[];
        public trxFreqs: string[];
				
		constructor(private sessionService: Services.sessionService, private $http: ng.IHttpService) {
		  
          this.getTrxTypes()
            .then(d=>this.trxTypes = d.data);
          
          this.getTrxFrequencies()
            .then(d=>this.trxFreqs = d.data);
        
        }
		
		private getTrxTypes(): ng.IHttpPromise<string[]> {
			
			var config: ng.IRequestConfig = {
				method: 'GET',
				url: this.sessionService.apiURL + '/api/admin/transactiontypes',
				headers: this.sessionService.httpGetHeaders,
			}
			
			return this.$http(config)				
		}
		
		private getTrxFrequencies(): ng.IHttpPromise<string[]> {
			
			var config: ng.IRequestConfig ={
				method: 'GET',
				url: this.sessionService.apiURL + '/api/admin/transactionfrequencies',
				headers: this.sessionService.httpGetHeaders
			}
			return this.$http(config);
		}
	}
}