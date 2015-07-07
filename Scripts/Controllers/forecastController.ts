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

            this.scope = $scope;
            var s: Date = new Date();
            var e: Date = utilities.lastDay(s, 0);
            this.forecastview = 'graph';
            this.forecastParams = {
                startdate: s,
                enddate: e,
                startbal: 0
            }
            this.headlines = {
                balance: 0,
                savings: 0,
                incoming: 0,
                outgoing: 0
            }
        }
        
        /** advances the view date forward 1 month */
        monthfwd() {
            this.mthOffset += 1;
            this.forecastParams.enddate = utilities.lastDay(this.forecastParams.enddate, this.mthOffset);
        }
        /** steps the view date back 1 month */
        monthBk() {
            this.mthOffset -= 1;
            this.forecastParams.enddate = utilities.lastDay(this.forecastParams.enddate, this.mthOffset);
        }

        showParameters() {
            this.parametersVisible = !this.parametersVisible;
        }

        refresh() {
            if (this.forecastview == 'graph') {
                this.scope.$broadcast('renderChart');
            } else {
                this.scope.$broadcast('renderGrid');
            }
        }

    }
}