///<reference path="../../all.d.ts"/>

module Budgeter.Services{
	
	export class apiFormatSvc{
		
		constructor() {}
		
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
				Start_date: Utilities.stringifyDate(t.Start_date),
				End_date: Utilities.stringifyDate(t.End_date),
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
				Start_date: Utilities.getUTCDate(t.Start_date),
				End_date: Utilities.getUTCDate(t.End_date),
				include: true
			}
		}
	}
}