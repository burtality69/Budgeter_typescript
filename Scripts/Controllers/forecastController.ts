///<reference path="../../all.d.ts"/>
module Budgeter.Controllers {
    /** Manages the viewstate and parameters for the main view */
    export class forecastController {
        forecastview: string;
        mthOffset: number;
        forecastParams: IForecastParams;
        headlines: IBudgetHeadLines;
        parametersVisible: boolean;
        scope: ng.IScope;
        newItemName: string;

        static $inject = ["forecastParamSvc"];

        constructor(paramSvc: Budgeter.Services.forecastParamSvc) {

            this.parametersVisible = true;
            this.forecastview = 'graph';
            this.forecastParams = paramSvc.params;
            this.headlines = { balance: 0, savings: 0, incoming: 0, outgoing: 0 }
        }
        
        /** advances the view date forward 1 month */
        mthFwd(): void {
            this.forecastParams.endDate = Budgeter.Utilities.lastDay(this.forecastParams.endDate, +1);
        }
        /** steps the view date back 1 month */
        mthBk(): void {
            this.forecastParams.endDate = Budgeter.Utilities.lastDay(this.forecastParams.endDate, -1);
        }

        showParameters(): void {
            this.parametersVisible = !this.parametersVisible;
        }

        refresh(): void {
            if (this.forecastview == 'graph') {
                this.scope.$broadcast('renderChart');
            } else {
                this.scope.$broadcast('renderGrid');
            }
        }

    }
}