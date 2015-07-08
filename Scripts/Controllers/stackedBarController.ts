///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {

	export class stackedBarController {

		public headlines: IBudgetHeadLines;
		static $inject = ['$scope', 'forecastController','forecastMgr'];
		private data: Array<iBudgetRowModel>
		public forecastController: Budgeter.Controllers.forecastController
		public forecastMgr: Budgeter.Services.forecastMgr
		private spin: boolean;

		constructor(scope: ng.IScope, forecastController: Budgeter.Controllers.forecastController, 
			forecastMgr: Budgeter.Services.forecastMgr) {
			this.spin = true;
			this.forecastController = forecastController; 
			this.forecastMgr = forecastMgr; 
		}

		refresh(params: IBudgetParams) {
			this.forecastMgr.getForecast(params)
				.success((response: Array<iBudgetRowModel>) => {
					this.data = response;	
				})
				.error((err: Error)=> {
					
				})
		}
	}
}