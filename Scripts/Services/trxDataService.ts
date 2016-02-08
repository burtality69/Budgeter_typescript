///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class trxDataService {

		static $inject = ['$http', 'sessionService', 'apiFormatSvc'];
		private url: string;

		constructor(public $http: ng.IHttpService, public sessionService: Budgeter.Services.sessionService,
			public apiFormatSvc: Budgeter.Services.apiFormatSvc) {

			this.url = sessionService.apiURL + '/api/transactions'
		}

		get(): Promise<ITransactionModel[]> {
			
            return new Promise((resolve, reject) => {
				var config: ng.IRequestConfig = {
					method: 'GET',
					url: this.url,
					headers: this.sessionService.httpGetHeaders,
                    transformResponse: (d,h) => (this.apiFormatSvc.transtoClientFmt(d))
				};
                
				this.$http(config)
					.then(d=> resolve(d.data))					
                    .catch(e=> { reject(e) });
			})
		}
		
		/**Post a single transaction model */
		post(t: ITransactionModel): Promise<ITransactionModel> {
			return new Promise((resolve, reject) => {
				
				let config: ng.IRequestConfig = {
					method: 'POST',
					url: this.url,
					headers: this.sessionService.httpGetHeaders,
					data: this.apiFormatSvc.transtoServerFmt(t)
				}
				this.$http(config)
					.then(d=> { resolve(d) })
					.catch(e=> { reject(e) })
			});
		}
		
		/**Update an existing transaction model */
		put(t: ITransactionModel): Promise<ITransactionModel> {
			return new Promise((resolve, reject) => {

				let config: ng.IRequestConfig = {
					method: 'PUT',
					url: this.url + '/' + t.ID,
					headers: this.sessionService.httpGetHeaders,
					data: this.apiFormatSvc.transtoServerFmt(t)
				}

				this.$http(config)
					.then(d=> resolve(d))
					.catch(e=> reject(e))
			})
		}

		delete(ID: number): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'DELETE',
				url: this.url + '/' + ID,
				headers: this.sessionService.httpGetHeaders
			}
			return this.$http(config);
		}

		newBlankTrans(): ITransactionModel {
			return {
				ID: undefined,
				Name: undefined,
				TypeID: undefined,
				UserID: undefined,
				TypeDescription: undefined,
				TransactionValues: []
			}
		}

	}
}
