///<reference path="../../all.d.ts"/>
module Budgeter.Directives {
	export function forecastControls() : ng.IDirective {
		return {
			restrict: 'EA',
			templateUrl: '/Views/Templates/forecastControls.html',
			controller: Controllers.forecastController,
			bindToController: true,
			controllerAs: 'fCtrl',
			transclude: true,
			scope: {}
			
		};
	};
}
