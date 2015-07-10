///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {

	export class stackedBarController {

		public headlines: IBudgetHeadLines;
		static $inject = ['$scope', 'forecastParamSvc', 'forecastMgr'];
		public data: Array<IForecastRowModel>;
		public forecastController: Budgeter.Controllers.forecastController
		public forecastMgr: Budgeter.Services.forecastMgr;
		public params: IForecastParams;
		public spin: boolean;
		public scope: ng.IScope;

		constructor($scope: ng.IScope, forecastParamSvc: Budgeter.Services.forecastParamSvc,
			forecastMgr: Budgeter.Services.forecastMgr) {
			this.spin = true;
			this.params = forecastParamSvc.params;
			this.forecastMgr = forecastMgr;
			this.scope = $scope;
		}

		refresh() {
			this.forecastMgr.getForecast()
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
					this.spin = false;
					this.scope.$broadcast('renderChart');
				})
				.error((err: Error) => {
					console.log(err.message);
				})
		}


	}
}