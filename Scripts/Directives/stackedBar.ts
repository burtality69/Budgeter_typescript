///<reference path="../../all.d.ts"/>

module Budgeter.Directives {
	export function stackedBar (): ng.IDirective {
		return {
			restrict: 'EA',
			bindToController: true,
			require: '^forecastControls',
			controllerAs: 'graphCtrl',
			scope: {params: '='},
			transclude: true,
			template: '<div class="graphloading spinner" ng-show="graphCtrl.spin">' +
                    '<div class="cube1"></div>' +
                    '<div class="cube2"></div>' +
                  '</div>' +
                  '<div class="headlines">' +
                      '<headline-item class="headline income" icon="fa fa-plus fa-3x" name="Income" value="graphCtrl.headlines.income"></headline-item>' +
                      '<headline-item class="headline spending" icon="fa fa-minus fa-3x" name="Spending" value="graphCtrl.headlines.spending"></headline-item>' +
                      '<headline-item class="headline balance" icon="fa fa-university fa-3x" name="Balance" value="graphCtrl.headlines.balance"></headline-item>' +
                      '<headline-item class="headline savings" icon="fa fa-money fa-3x" name="Savings" value="graphCtrl.headlines.savings"></headline-item>' +
                  '</div>' +
                  '<div id="graphdiv" class="graphcontainer clearfix" ng-show="!graphCtrl.spin"></div>',
			controller: Budgeter.Controllers.stackedBarController
		}
	}
}
