///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {

	export class stackedBarController {

		public headlines: IBudgetHeadLines;
		static $inject = ['$scope', 'forecastController','forecastMgr'];
		private data: iBudgetRowModel
		private spin: boolean;

		constructor(scope: ng.IScope, forecastController: forecastController, forecastMgr: Budgeter.Services.forecastMgr) {
			this.spin = true;
		}

		refresh(params: IBudgetParams) {
			
		}
	}
}