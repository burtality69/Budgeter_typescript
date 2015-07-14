///<reference path="../../all.d.ts"/>

module Budgeter.Directives {
	
	export function transactionValue (): ng.IDirective {
		
		return{
			restrict: 'EA',
			scope: {tv: '=', liststate:'='},
			replace: true,
			controllerAs: 'tvCtrl',
			bindToController: true,
			controller: Budgeter.Controllers.transactionValueController,
			template: 
			'<li class="transactionvalue list-group-item clearfix">' +
				'<div class="transactionValue clearfix row">' +
					'<div class="col-xs-2">{{::tvCtrl.tv.Start_date | date:"shortDate": "UTC"}}</div>' +
					'<div class="col-xs-2">{{::tvCtrl.tv.FrequencyDescription}}</div>' +
					'<div class="col-xs-1">{{::tvCtrl.tv.Day}}</div>' +
					'<div class="col-xs-2">{{::tvCtrl.tv.End_date | date:"shortDate": "UTC"}}</div>' +
					'<div class="col-xs-2">{{::tvCtrl.tv.Value | currency:"$" }}</div>' +
					'<div class="col-xs-1"><i class="fa fa-pencil-square-o" ng-click="tvCtrl.edit()"></i></div>' +
					'<div class="col-xs-1"><i class="fa fa-trash-o" ng-click="tvCtrl.delete()"></i></div>' +
					'<input type="checkbox" ng-model="tvCtrl.tv.include" ng-click="tvCtrl.toggleInclude()"></input>' +
				'</div>' +
			'</li>' 
		}
	}
}

module Budgeter.Controllers {
	
	export interface ITransactionValueScope extends ng.IScope {
		tv: ITransactionValueModel,
		liststate: ITransValueListState
	}
	
	export class transactionValueController {
		
		constructor($scope: ITransactionValueScope) {
			
		}
		
		edit() {
			this.$scope.
		}
	}
}