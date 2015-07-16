///<reference path="../../all.d.ts"/>

module Budgeter.Services {
	
	export class transactionMgr {
		
		static $inject = ['$http','sessionService'];
		
		public http: ng.IHttpService;
		public headers: Object;
		public url: string; 
		public sessionService: Budgeter.Services.sessionService;
		
		constructor($http: ng.IHttpService, sessionService: Budgeter.Services.sessionService) {
			this.http = $http;
			this.url = sessionService.apiURL + '/api/transactions'
			this.headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionService.Token}
		}
		
		get(): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {method: 'GET', url: this.url, headers: this.headers};
			return this.http(config);
		}
		
		post(t: ITransactionModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {method: 'POST', url: this.url, headers: this.headers, data: t}
			return this.http(config);
		}
		
		put(t: ITransactionModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {method: 'PUT', url: this.url + '/' + t.ID,
				 headers: this.headers, data: t}
			 return this.http(config);
		}
		
		delete(ID: number): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {method: 'DELETE', url: this.url + '/' + ID,
				headers: this.headers}
			return this.http(config);
		}
		
		newBlankTrans(): ITransactionModel {
			return {
				ID: null,
				Name: null,
				TypeID: null,
				UserID: null,
				TypeDescription: null,
				TransactionValues: null
			}
		}
		
		transtoClientModel(t: ITransactionServerModel): ITransactionModel {
			return {
				ID: t.ID,
				Name: t.Name,
				TypeID: t.TypeID,
				UserID: t.UserID,
				TypeDescription: t.TypeDescription,
				TransactionValues: t.TransactionValues.map(tv => {
					return this.tvToClientModel(tv);
				})
			}
		}
		
		tvToClientModel(t: ITransactionValueServerModel): ITransactionValueClientModel {
			return {
				ID: t.ID,
				TransactionID: t.TransactionID,
				Value: t.Value,
				FrequencyID: t.FrequencyID,
				FrequencyDescription: t.FrequencyDescription,
				Day: t.Day,
				Start_date: Utilities.getUTCDate(t.Start_date),
				End_date: Utilities.getUTCDate(t.End_date)
			}
		}
		
	}
}
