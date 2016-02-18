///<reference path="../../all.d.ts"/>

module Budgeter.Directives{
	
	export function headlineItem (): ng.IDirective {
		return {
			scope: {name: '@',value: '=',icon: '@'},
			replace: true,
			templateurl: '/Components/HeadlineItem/headlineItem.htm' 
		}
	}
}