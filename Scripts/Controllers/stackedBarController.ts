///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {

	export class stackedBarController {

		public headlines: IBudgetHeadLines;
		static $inject = ['$scope', 'forecastController', 'forecastMgr'];
		public data: Array<IForecastRowModel>;
		public forecastController: Budgeter.Controllers.forecastController
		public forecastMgr: Budgeter.Services.forecastMgr
		public spin: boolean;

		constructor(scope: ng.IScope, forecastController: Budgeter.Controllers.forecastController,
			forecastMgr: Budgeter.Services.forecastMgr) {
			this.spin = true;
			this.forecastController = forecastController;
			this.forecastMgr = forecastMgr;
		}

		refresh(params: IBudgetParams) {
			this.forecastMgr.getForecast(this.forecastController.forecastParams)
				.success((response: Array<IForecastRowModel>) => {

					this.data = response;

					var lastrow = response[response.length - 1];
					var income = 0;
					var outgoing = 0;

					for (var i = 0; i < response.length; i++) {
						income += response[i].total_payments;
						outgoing += response[i].total_deductions;
					}
					this.headlines.balance = lastrow.balance;
					this.headlines.savings = lastrow.savings;
					this.headlines.incoming = income;
					this.headlines.outgoing = outgoing;
				})
				.error((err: Error) => {
					console.log(err.message);
				})
		}


	}
}