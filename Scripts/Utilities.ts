///<reference path="../all.d.ts"/>

module Budgeter.Utilities {
	/** takes a date and a month number to offset */
	export function lastDay(date: Date, offset: number): Date {
		return new Date(date.getFullYear(), (date.getMonth()+1) + offset, 0);
	};

	export function getUTCDate(indate: string): Date {

		var p = new Date(indate);		
		
		return new Date(p.getUTCFullYear(), p.getUTCMonth(), p.getUTCDate(), p.getUTCHours(), p.getUTCMinutes(), p.getUTCSeconds());
    }
	
	export function stringifyDate(d: Date): string {
		return d.toLocaleDateString();
	}
}
