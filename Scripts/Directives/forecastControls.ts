///<reference path="../../all.d.ts"/>
module Budgeter.Directives {
	export function forecastControls(forecastParams: IBudgetParams) : ng.IDirective {
		return {
			restrict: 'EA',
			templateUrl: '/Views/Templates/forecastControls.html',
			bindToController: true,
			controllerAs: 'fCtrl',
			transclude: true,
			scope: {},
			controller: Controllers.forecastController
		};
	};
}
