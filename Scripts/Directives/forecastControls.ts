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

module Budgeter.Controllers {
    /** Manages the viewstate and parameters for the main view */
    export class forecastController {
        forecastview: string;
        mthOffset: number;
        forecastParams: IForecastParams;
        parametersVisible: boolean;          
        newItemName: string;

        static $inject = ['$rootScope','forecastParamSvc','apiFormatSvc'];
        
        constructor(public $rootScope: ng.IRootScopeService, paramSvc: Budgeter.Services.forecastParamSvc
            ,public apiFormatSvc: Budgeter.Services.apiFormatSvc) {
            this.parametersVisible = true;
            this.forecastview = 'graph';
            this.forecastParams = paramSvc.params;
        }
        
        /** advances the view date forward 1 month */
        mthFwd(): void {
            this.forecastParams.endDate = this.apiFormatSvc.lastDay(this.forecastParams.endDate, +1);
        }
        /** steps the view date back 1 month */
        mthBk(): void {
            this.forecastParams.endDate = this.apiFormatSvc.lastDay(this.forecastParams.endDate, -1);
        }

        showParameters(): void {
            this.parametersVisible = !this.parametersVisible;
        }

        refresh(): void {
            this.$rootScope.$emit('refresh');
        }

    }
}