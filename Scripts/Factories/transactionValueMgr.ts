///<reference path="../../all.d.ts"/>

module Budgeter.Services {

	export class transactionValueMgr {

		static $inject = ['$http', 'sessionService'];

		headers: Object;
		url: string;
		http: ng.IHttpService;
		sessionService: Budgeter.Services.sessionService;

		constructor($http: ng.IHttpService, sessionService: Budgeter.Services.sessionService) {

			this.http = $http;
			this.url = sessionService.apiURL + '/api/transactionValues'
			this.headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionService.Token }

		}
		
		get(): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'GET',
				url: this.url,
				headers: this.headers
			};

			return this.http(config);
		}
		
		post(t: ITransactionValueClientModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'POST',
				url: this.url,
				headers: this.headers,
				data: t
			};

			return this.http(config);
		}
		
		put(t: ITransactionValueClientModel): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'PUT',
				url: this.url + '/' + t.ID,
				headers: this.headers,
				data: this.toServerModel(t)				
			}
			
			return this.http(config); 
		}
		
		delete(ID: number): ng.IHttpPromise<any> {
			var config: ng.IRequestConfig = {
				method: 'DELETE',
				url: this.url + '/' + ID,
				headers: this.headers,
			}
			
			return this.http(config); 
		}
		
		toServerModel(t: ITransactionValueClientModel) {
			return {
				ID: t.ID,
				TransactionID: t.TransactionID,
				Value: t.Value,
				FrequencyID: t.FrequencyID,
				FrequencyDescription: t.FrequencyDescription,
				Day: t.Day,
				Start_date: Utilities.stringifyDate(t.Start_date),
				End_date: Utilities.stringifyDate(t.End_date)
			}
		}
		
		toClientModel(t: ITransactionValueServerModel): ITransactionValueClientModel {
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
		
		getnewTransactionValue(): ITransactionValueClientModel {
			return {
				ID: null,
				TransactionID: null,
				Value: null,
				FrequencyID: null,
				FrequencyDescription: null,
				Day: null,
				Start_date: null,
				End_date: null
			}
		}
	}
}