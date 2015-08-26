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
					var height: number = parseInt(d3.select('#forecast').style('height')) - (margin.top + margin.bottom);
                    
                    //X axis 
                    var x: D3.Scale.TimeScale = d3.time.scale().range([0, width]);
                    
                    // X domain is the dates
                    x.domain(d3.extent(data, d=> { return d.caldate; }));
					
                    //Y Scale
                    var y: D3.Scale.LinearScale = d3.scale.linear().rangeRound([height, 0]);
                    
                    // Y domain is the biggest negative amount to the biggest positive
                    y.domain([
                        d3.min(data, d => { return Math.min(d.balance, d.total_deductions); }),
                        d3.max(data, d => { return Math.max(d.balance, d.total_payments) })
                    ]);

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
        
                    // Balance Accumulation Line 
                    svg.append("path")
                        .datum(data)
                        .attr("class", "balanceline")
                        .attr("d", balanceline);
                        
                    // Savings Accumulation Line 
                    svg.append("path")
                        .datum(data)
                        .attr("class", "savingsline")
                        .attr("d", savingsline);

                    //Create payments 
                    var payments = svg.selectAll("payment")
                        .data(data.filter(d=>{return Math.abs(d.total_payments) > 0}))
                        .enter().append("rect")
                        .attr("transform", d => { return "translate(" + x(d.caldate) + ",0)"; })
                        .attr("width", width / data.length)
                        .attr("y",y(0))
                        .attr("height",0)
                        .attr("class","payment")
                        .on('click', (d: IForecastRowModel) => { console.log(d); })
                        .transition().duration(1000)
                        .attr("y", (d: IForecastRowModel) => { return y(d.total_payments); })
                        .attr("height", (d: IForecastRowModel) => {return y(0) - y(Math.abs(d.total_payments)); });
                    
                    //Create deductions
                    var deductions = svg.selectAll("deduction")
                        .data(data.filter(d=> { return Math.abs(d.total_deductions) > 0 }))
                        .enter().append("rect")
                        .attr("transform", d => { return "translate(" + x(d.caldate) + ",0)"; })
                        .attr("width", width / data.length)
                        .attr("class", "deduction")
                        .attr("y",y(0))
                        .attr("height",0)
                        .on("click", (d: IForecastRowModel) => { console.log(d) });
                        
                        deductions.transition().duration(1000)
                        .attr("y", y(0))
                        .attr("height", (d: IForecastRowModel) => { return y(d.total_deductions) - y(0); })
                           
                        
                    //Create the labels
                    deductions.selectAll("svg.title")
                        .data(data)
                        .enter().append("svg:title")
                        .text(d => { return JSON.stringify(d); });

                    ctrl.spin = false;
                };

                ctrl.forecastMgr.getForecast().then(data=>{
                    render(data.transactions);
                })

                ctrl.$rootScope.$on('chartData', function() { 
                    ctrl.spin = true;
                    render(ctrl.data) 
                });

            }
        }
    }
}

module Budgeter.Controllers {

	export class stackedBarController {

		static $inject = ['$rootScope', 'forecastParamSvc', 'forecastMgr','notify'];
        public headlines: IBudgetHeadLines;
		public data: Array<IForecastRowModel>;
		public forecastController: Budgeter.Controllers.forecastController
		public params: IForecastParams;
		public spin: boolean;

		constructor(public $rootScope: ng.IRootScopeService, forecastParamSvc: Budgeter.Services.forecastParamSvc,
			public forecastMgr: Budgeter.Services.forecastMgr, public notify: ng.cgNotify.INotifyService) {
			this.spin = true;
			this.params = forecastParamSvc.params;
			this.$rootScope.$on('refresh', () => this.refresh());
		}
        
		refresh() {
			this.forecastMgr.getForecast().then(d=>{
                    this.data = d.transactions;
                    this.headlines = d.headlines;                
					this.spin = false;
					this.$rootScope.$emit('chartData');
				})
                .catch(e=>{
                    this.notify({message: 'Error loading data',classes: 'alert-danger'})
                })
		}

	}
}