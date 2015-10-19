///<reference path="../../all.d.ts"/>

module Budgeter.Services {
	
	/** Service to handle transforming API data to javascript friendly data and back */
	export class apiFormatSvc {

		constructor() { }
		
		/**Converts a transaction in client format (dates are dates) to server format (dates = strings) */
		transtoServerFmt(t: ITransactionModel): ITransactionServerModel {
			return {
				ID: t.ID,
				Name: t.Name,
				TypeID: t.TypeID,
				UserID: t.UserID,
				TypeDescription: t.TypeDescription,
				TransactionValues: t.TransactionValues.map(tv => {
					return this.tvtoServerFmt(tv);
				})

			}
		}

		transtoClientFmt(t: ITransactionServerModel): ITransactionModel {
			return {
				ID: t.ID,
				Name: t.Name,
				TypeID: t.TypeID,
				UserID: t.UserID,
				TypeDescription: t.TypeDescription,
				TransactionValues: t.TransactionValues.map(tv => {
					return this.tvToClientFmt(tv);
				})
			}
		}

		tvtoServerFmt(t: ITransactionValueClientModel): ITransactionValueServerModel {
			return {
				ID: t.ID,
				TransactionID: t.TransactionID,
				Value: t.Value,
				FrequencyID: t.FrequencyID,
				FrequencyDescription: t.FrequencyDescription,
				Day: t.Day,
				Start_date: this.stringifyDate(t.Start_date),
				End_date: this.stringifyDate(t.End_date),
				include: t.include
			}
		}

		tvToClientFmt(t: ITransactionValueServerModel): ITransactionValueClientModel {
			return {
				ID: t.ID,
				TransactionID: t.TransactionID,
				Value: t.Value,
				FrequencyID: t.FrequencyID,
				FrequencyDescription: t.FrequencyDescription,
				Day: t.Day,
				Start_date: this.getUTCDate(t.Start_date),
				End_date: this.getUTCDate(t.End_date),
				include: true
			}
		}
		
		/** Converts ISO string dates to dates */
		forecastRowModelToClientFormat(t: IForecastRowServerModel ): IForecastRowModel {
			return {
				caldate: this.getUTCDate(t.caldate),
				payment_details: t.payment_details,
				total_payments: t.total_payments,
				deduction_details: t.deduction_details,
				total_deductions: t.total_deductions,
				savings_details: t.savings_details,
				total_savings: t.total_savings,
				balance: t.balance,
				savings: t.savings
			}
		}
		
		/** Return the last day of the month for a given date offset by x months */
		lastDay(date: Date, offset: number): Date {
			return new Date(date.getFullYear(), (date.getMonth() + 1) + offset, 0);
		};
		
		/** converts a date string (.net ISO8601) to UTC javascript Date */
		getUTCDate(indate: string): Date {

			var p = new Date(indate);

			return new Date(p.getUTCFullYear(),
				p.getUTCMonth(),
				p.getUTCDate(),
				p.getUTCHours(),
				p.getUTCMinutes(),
				p.getUTCSeconds()
				);
		}
		
		/** stringifies a date for API post */
		stringifyDate(d: Date): string {
			return d.toLocaleDateString();
		}
		
		dateforQueryString(d: Date): string {
			var y = d.getFullYear()
			var m = d.getMonth()+1; 
			var dy = d.getDate();
			
			var mth = m < 10 ? '0'+m : m;
			var day = dy < 10 ? '0'+ dy : dy;
			
			var r: string = y + '-' + mth + '-' + day; 
			
			return r;
		}
	}
}