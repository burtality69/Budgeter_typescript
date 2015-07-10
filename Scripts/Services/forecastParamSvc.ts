///<reference path="../../all.d.ts"/>

module Budgeter.Services{
	
	export class forecastParamSvc {
		private _params: IForecastParams;
		
		constructor() {
			var s: Date = new Date();
            var e: Date = Budgeter.Utilities.lastDay(s, 3);
			this._params = {startDate:s, endDate: e, startBal: 0};
		}
		
		get params(): IForecastParams {
			return this._params;
		}
		
		set params(p: IForecastParams) {
			this._params = p;
		}
		
		get apiParams(){
			return {startdate: Budgeter.Utilities.stringifyDate(this.startDate),
					enddate: Budgeter.Utilities.stringifyDate(this.endDate),
					startbal: this.startbal
				}
		}
		
		get startbal(): number {
			return this._params.startBal;
		}
					
		set startbal(n: number) {
			this._params.startBal = n;
		}
		
		get startDate(): Date {
			return this._params.startDate;
		}
		
		set startDate(d: Date) {
			this._params.endDate = d;
		}
		
		get endDate(): Date {
			return this._params.endDate;
		}
		
		set endDate(d: Date) {
			this._params.endDate = d; 
		}
	}
}

