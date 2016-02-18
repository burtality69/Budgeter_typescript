///<reference path="../../all.d.ts"/>

module Budgeter.Directives {

    interface stackedBarScope extends ng.IScope{
        ctrl: stackedBarController;
    }

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
            controller: stackedBarController,
            controllerAs: 'ctrl',
            transclude: true,
            templateUrl: './Components/Stackedbar/Stackedbar.htm',
            link: (s: stackedBarScope, e: ng.IAugmentedJQuery,a: ng.IAttributes) => {
                    
                let panel = d3.select('#forecast');

                function render(data: Array<IForecastRowModel>) {
					
                    //container size 
                    var margin = { top: 40, right: 40, bottom: 60, left: 40 }
                    var width: number = 700 - (margin.left + margin.right);
                    var height: number = 500 - (margin.top + margin.bottom);
                    
                    //X axis 
                    var x  = d3.time.scale().range([0, width]);
                    
                    // X domain is the dates
                    x.domain(d3.extent(data, d=> d.caldate));
					
                    //Y Scale
                    var y = d3.scale.linear().rangeRound([height, 0]);
                    
                    // Y domain is the biggest negative amount to the biggest positive
                    y.domain([
                        d3.min(data, d =>  Math.min(d.balance, d.total_deductions)),
                        d3.max(data, d =>  Math.max(d.balance, d.total_payments))
                    ]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .tickFormat(d3.format(".2s"));

                    d3.select("svg").remove();

                    let svg = d3.select("#graphdiv")
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("class", "graphcanvas")
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                                                            
                    //Balance line
                    let balanceline = d3.svg.line<IForecastRowModel>()
                        .interpolate("basis")
                        .x(d => x(d.caldate))
                        .y(d => y(d.balance));
        
                    //Savings line
                    let savingsline = d3.svg.line<IForecastRowModel>()
                        .interpolate("basis")
                        .x(d => x(d.caldate))
                        .y(d => y(d.total_savings));
        
                    //Create an X axis
                    svg.append("g")
                        .attr("class", "xaxis")
                        .attr("transform", `translate(0,${y(0)})`)
                        .attr("height", height)
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
                    let payments = svg.selectAll("payment")
                        .data(data.filter(d=> Math.abs(d.total_payments) > 0 ))
                        .enter().append("rect")
                        .attr("transform", d => { return "translate(" + x(d.caldate) + ",0)"; })
                        .attr("width", width / data.length)
                        .attr("y", y(0))
                        .attr("height", 0)
                        .attr("class", "payment")
                        .on('click', (d: IForecastRowModel) => console.log(d))
                      
                    payments.transition()   
                        .duration(1000)
                        .attr("y", d  => y(d.total_payments))
                        .attr("height", d => y(0) - y(Math.abs(d.total_payments)));
                    
                    //Create deductions
                    let deductions = svg.selectAll("deduction")
                        .data(data.filter(d=> Math.abs(d.total_deductions) > 0 ))
                        .enter().append("rect")
                        .attr("transform", d => `translate(${x(d.caldate)},0)`)
                        .attr("width", width / data.length)
                        .attr("class", "deduction")
                        .attr("y", y(0))
                        .attr("height", 0)
                        .on("click", (d: IForecastRowModel) => { console.log(d) });
                     
                     deductions.transition()
                        .duration(1000)
                        .attr("y", y(0))
                        .attr("height", (d: IForecastRowModel) => y(d.total_deductions) - y(0))
                             
                    //Create the labels
                    deductions.selectAll("svg.title")
                        .data(data)
                        .enter().append("svg:title")
                        .text(d => { return JSON.stringify(d); });

                    s.ctrl.spin = false;
                    s.$apply;
                };

                refresh();

                function refresh() {
                    s.ctrl.spin = true;
                    s.ctrl.getData()
                        .then(data=> render(data.transactions))
                        .catch(e=> s.ctrl.notify({ message: `Problem loading: ${e.message}`, classes: 'alert-danger' }))
                }

                s.ctrl.$rootScope.$on('refresh', () => {
                    refresh()
                });

            }
        }
    }
}



class stackedBarController {

    static $inject = ['$rootScope', 'forecastDataSvc', 'notify'];
    public headlines: IBudgetHeadLines;
    public params: IForecastParams;
    public spin: boolean;

    constructor(public $rootScope: ng.IRootScopeService, public forecastDataSvc: Budgeter.Services.forecastDataSvc, 
            public notify: ng.cgNotify.INotifyService) {
        this.spin = true;
    }

    getData() {
        return this.forecastDataSvc.getForecast();
    }
}
