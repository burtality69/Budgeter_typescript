///<reference path="../../all.d.ts"/>
module Budgeter.Controllers {
    /** Manages the viewstate and parameters for the main view */
    export class forecastController {
        forecastview: string;
        mthOffset: number;
        forecastParams: IBudgetParams;
        headlines: IBudgetHeadLines;
        parametersVisible: boolean;
        scope: ng.IScope;
        newItemName: string;

        static $inject = ["$scope"];

        constructor($scope: ng.IScope) {

            var s: Date = new Date();
            var e: Date = Budgeter.Utilities.lastDay(s, 0);
            this.parametersVisible = true;
            this.forecastview = 'graph';
            this.forecastParams = { startdate: s, enddate: e, startbal: 0 }
            this.headlines = { balance: 0, savings: 0, incoming: 0, outgoing: 0 }
        }
        
        /** advances the view date forward 1 month */
        mthFwd(): void {
            this.forecastParams.enddate = Budgeter.Utilities.lastDay(this.forecastParams.enddate, +1);
        }
        /** steps the view date back 1 month */
        mthBk(): void {
            this.forecastParams.enddate = Budgeter.Utilities.lastDay(this.forecastParams.enddate, -1);
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