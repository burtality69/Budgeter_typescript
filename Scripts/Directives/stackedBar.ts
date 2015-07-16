///<reference path="../../all.d.ts"/>

module Budgeter.Directives {

    interface IBarSpec {
        name: string;
        yPos: number;
        height: number;
    }

    interface IEnhancedForecastRowModel extends IForecastRowModel {
        amounts?: Array<IBarSpec>;
        labels?: string;
    }

    export function stackedBar(): ng.IDirective {
        return {
            restrict: 'EA',
            bindToController: true,
            controller: Budgeter.Controllers.stackedBarController,
            controllerAs: 'graphCtrl',
            transclude: true,
            template: 
            '<div class="graphloading spinner" ng-show="graphCtrl.spin">' +
                '<div class="cube1"></div>' +
                '<div class="cube2"></div>' +
            '</div>' +
            '<div class="headlines">' +
                '<headline-item class="headline income" icon="glyphicon glyphicon-arrow-up" name="Earned" value="graphCtrl.headlines.incoming"></headline-item>' +
                '<headline-item class="headline spending" icon="glyphicon glyphicon-arrow-down" name="Spent" value="graphCtrl.headlines.outgoing"></headline-item>' +
                '<headline-item class="headline savings" icon="glyphicon glyphicon-piggy-bank" name="Saved" value="graphCtrl.headlines.savings"></headline-item>' +
                '<headline-item class="headline balance" icon="glyphicon glyphicon-usd" name="Remaining" value="graphCtrl.headlines.balance"></headline-item>' +
            '</div>' +
            '<div id="graphdiv" class="graphcontainer clearfix" ng-show="!graphCtrl.spin"></div>',

            link: function(scope: ng.IScope, el: JQuery,
                att: ng.IAttributes, ctrl: Budgeter.Controllers.stackedBarController) {

                function render(data: Array<IForecastRowModel>) {
					
                    //container size 
                    var margin = { top: 40, right: 40, bottom: 60, left: 40 }
                    var width: number = parseInt(d3.select('#forecast').style('width')) - (margin.left + margin.right);
                    //var height: number = parseInt(d3.select('#forecast').style('width')) - (margin.top + margin.bottom); 
					var height: number = window.screen.availHeight - (margin.top + margin.bottom);
                    //Colour palette
                    var positives: string = '#5cb85c';
                    var negatives: string = "#CC5343";
                    var savings: string = "#3829AA";
                    var accumulation: string = "#f0ad4e";
                    var other: string = "#0066FF";
					
                    //X axis 
                    var x: D3.Scale.TimeScale = d3.time.scale().range([0, width]);
                    
                    // X domain is the dates
                    x.domain(d3.extent(data, d=> { return d.caldate; }));
					
                    //Y Scale
                    var y: D3.Scale.LinearScale = d3.scale.linear().rangeRound([height, 0]);
                    
                    // Y domain is the biggest negative amount to the biggest positive
                    y.domain([
                        d3.min(data, d => { return Math.min(d.balance,d.total_deductions); }),
                        d3.max(data, d => { return Math.max(d.balance, d.total_payments) })
                    ]);

                    var color: D3.Scale.OrdinalScale = d3.scale.ordinal()
                        .range([positives, negatives, savings, other]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .tickFormat(d3.format(".2s"));

                    d3.select("svg").remove();

                    var svg = d3.select("#graphdiv")
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("class", "graphcanvas")
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				
                    
                    //Get the colour domain 
                    color.domain(d3.keys(data[0]).filter(key =>
                        key !== "caldate" && key !== "payment_details"
                        && key !== "deduction_details" && key !== "savings_details"
                        && key !== "savings"
                        ))
                    
                    //Map additional properties to data to represent bars 
                    data.forEach((d: IEnhancedForecastRowModel) => {
                        d.amounts = color.domain().map(name => {
                            return { name: name, yPos: Math.max(0, parseInt(d[name])), height: Math.abs(d[name]) }
                        })
                        d.labels = d.payment_details + " " + d.deduction_details;
                    });
                    
                    //Balance line
                    var balanceline = d3.svg.line()
                        .interpolate("basis")
                        .x(d => { return x(d.caldate); })
                        .y(d => { return y(d.balance); });
        
                    //Savings line
                    var savingsline = d3.svg.line()
                        .interpolate("basis")
                        .x(d => { return x(d.caldate); })
                        .y(d => { return y(d.total_savings); });
        
                    //Create an X axis
                    svg.append("g")
                        .attr("class", "xaxis")
                        .attr("transform", "translate(0," + y(0) + ")")
                        .attr("height",height)
                        .call(xAxis)
                        .selectAll("text")
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", d => { return "rotate(-65)"; });
        
                    //Create a Y axis
                    svg.append("g")
                        .attr("class", "yaxis")
                        .call(yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end");
        
                    // Create a line for the totals
                    svg.append("path")
                        .datum(data)
                        .attr("class", "balanceline")
                        .attr("d", balanceline);

                    svg.append("path")
                        .datum(data)
                        .attr("class", "savingsline")
                        .attr("d", savingsline);
        
                    //Create an array of G's to contain the newVal
                    var bars = svg.selectAll(".date")
                        .data(data)
                        .enter().append("g")
                        .attr("class", "g")
                        .attr("transform", d => { return "translate(" + x(d.caldate) + ",0)"; });
                        
                    //Create the rectangles 
                    bars.selectAll("rect")
                        .data((d: IEnhancedForecastRowModel) => { return [d.amounts[0], d.amounts[1]]; })
                        .enter().append("rect")
                        .attr("width", width / data.length)
                        .attr("y",y(0))
                        .attr("height",0)
                        .style("fill", (d: IBarSpec) => { return color(d.name); })
                        .on('click', (d: IBarSpec) => { console.log(d); })
                        .transition().duration(1000)
                        .attr("y", (d: IBarSpec) => { return y(d.yPos); })
                        .attr("height", (d: IBarSpec) => { return y(0) - y(d.height); });
        
                    //Create the labels
                    bars.selectAll("svg.title")
                        .data(d => { return [d.labels]; })
                        .enter().append("svg:title")
                        .text(d => { return JSON.stringify(d); });

                    ctrl.spin = false;
                    ctrl.data = [];
                };

                ctrl.refresh();

                ctrl.scope.$on('chartData', function() { render(ctrl.data) });

            }
        }
    }
}

module Budgeter.Controllers {

	export class stackedBarController {

		public headlines: IBudgetHeadLines;
		static $inject = ['$scope', 'forecastParamSvc', 'forecastMgr'];
		public data: Array<IForecastRowModel>;
		public forecastController: Budgeter.Controllers.forecastController
		public forecastMgr: Budgeter.Services.forecastMgr;
		public params: IForecastParams;
		public spin: boolean;
		public scope: ng.IScope;

		constructor($scope: ng.IScope, forecastParamSvc: Budgeter.Services.forecastParamSvc,
			forecastMgr: Budgeter.Services.forecastMgr) {
			this.spin = true;
			this.params = forecastParamSvc.params;
			this.forecastMgr = forecastMgr;
			this.scope = $scope;
            this.headlines = { balance: 0, savings: 0, incoming: 0, outgoing: 0 }
			this.scope.$on('refresh', evt => this.refresh());
		}

		refresh() {
			this.forecastMgr.getForecast()
				.success((response: Array<any>) => {
					this.data = response.map(f => <IForecastRowModel>{
						caldate: Budgeter.Utilities.getUTCDate(f.caldate),
						payment_details: f.payment_details,
						total_payments: f.total_payments,
						deduction_details: f.deduction_details,
						total_deductions: f.total_deductions,
						savings_details: f.savings_details,
						total_savings: f.total_savings,
						balance: f.balance,
						savings: f.savings
					})

					var lastrow = response[response.length - 1];
					var income = 0;
					var outgoing = 0;

					for (var i = 0; i < response.length; i++) {
						income += response[i].total_payments;
						outgoing += response[i].total_deductions;
					}
					this.headlines.balance = lastrow.balance;
					this.headlines.savings = lastrow.savings;
					this.headlines.incoming = income;
					this.headlines.outgoing = outgoing;
					this.spin = false;
					this.scope.$broadcast('chartData');
				})
				.error((err: Error) => {
					console.log(err.message);
				})
		}

	}
}