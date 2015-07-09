///<reference path="../../all.d.ts"/>

module Budgeter.Directives {
	export function stackedBar (d3: D3.Base): ng.IDirective {
		return {
			restrict: 'EA',
			require: '^forecastControls',
			bindToController: true,
			controller: Budgeter.Controllers.stackedBarController,
			controllerAs: 'graphCtrl',
			scope: {params: '='},
			transclude: true,
			template: '<div class="graphloading spinner" ng-show="graphCtrl.spin">' +
                    '<div class="cube1"></div>' +
                    '<div class="cube2"></div>' +
                  '</div>' +
                  '<div class="headlines">' +
                      '<headline-item class="headline income" icon="fa fa-plus fa-3x" name="Income" value="graphCtrl.headlines.income"></headline-item>' +
                      '<headline-item class="headline spending" icon="fa fa-minus fa-3x" name="Spending" value="graphCtrl.headlines.spending"></headline-item>' +
                      '<headline-item class="headline balance" icon="fa fa-university fa-3x" name="Balance" value="graphCtrl.headlines.balance"></headline-item>' +
                      '<headline-item class="headline savings" icon="fa fa-money fa-3x" name="Savings" value="graphCtrl.headlines.savings"></headline-item>' +
                  '</div>' +
                  '<div id="graphdiv" class="graphcontainer clearfix" ng-show="!graphCtrl.spin"></div>',
			
			link: function(scope: ng.IScope, el: JQuery, 
				att: ng.IAttributes, ctrl: Budgeter.Controllers.stackedBarController) {
				
				function render(data: Array<IForecastRowModel>) {
					
					//container size 
					var margin = {top: 40, right: 40, bottom: 60, left: 40}
					var width: number = parseInt(d3.select('#forecast').style('width')) - (margin.left + margin.right);
					var height: number = parseInt(d3.select('#forecast').style('width')) - (margin.top + margin.bottom); 
					
					//Colour palette
					var positives: string = '#5cb85c';
    				var	negatives: string = "#CC5343"; 
                	var savings: string = "#3829AA";
                	var accumulation: string = "#f0ad4e";
                	var other: string = "#0066FF";
					
					//X axis 
					var x: D3.Scale.TimeScale = d3.time.scale().range([0, width]);
					
					//Y Scale
					var y: D3.Scale.LinearScale = d3.scale.linear().rangeRound([height, 0]);

					var color: D3.Scale.OrdinalScale = d3.scale.ordinal()
						.range([positives, negatives, savings, other]);

					var xAxis = d3.svg.axis()
						.scale(x)
						.orient("bottom");

					var yAxis = d3.svg.axis()
						.scale(y)
						.orient("left")
						.tickFormat(d3.format(".2s"));
						
					d3.select("svg").remove;
					
					var svg = d3.select("#graphdiv")
						.append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("class","graphcanvas")
						.attr("height",height + margin.top + margin.bottom)
						.append("g")
						.attr("transform","translate(" + margin.left + "," + margin.top + ")");
				
					//START USING DATA
				}
			}
		}
	}
}
