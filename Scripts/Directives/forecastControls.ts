///<reference path="../../all.d.ts"/>
module Budgeter.Directives {
	export function forecastControls() : ng.IDirective {
		return {
			restrict: 'EA',
			templateUrl: '/Views/Templates/forecastControls.html',
			controller: forecastController,
			bindToController: true,
			controllerAs: 'fCtrl',
			transclude: true,
			scope: {}
		};
	};
}

/** Manages the viewstate and parameters for the main view */
class forecastController {
    
    private forecastview: string;
    private mthOffset: number;
    private forecastParams: IForecastParams;
    private parametersVisible: boolean;          

    static $inject = ['$rootScope','forecastParamSvc','apiFormatSvc'];
    
    constructor(public $rootScope: ng.IRootScopeService, private paramSvc: Budgeter.Services.forecastParamSvc
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
    
    /** Toggles the parameter view */
    showParameters(): void {
        this.parametersVisible = !this.parametersVisible;
    }
    
    /** Sends refresh on the rootscope */
    refresh(): void {
        this.$rootScope.$emit('refresh');
    }

}
