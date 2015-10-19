
///<reference path="../../all.d.ts"/>"

module Budgeter.Directives {

  export function forecastGrid(): ng.IDirective {
    return {
      restrict: 'EA',
      bindToController: true,
      controllerAs: 'forecastGridCtrl',
      require: 'forecastControls',
      scope: true,
      transclude: true,
      controller: forecastGridCtrl,
      link: (scope, el, attr, fctrl) => {

        var render = (data: iBudgetRowModel[]) => {

          var descriptions = [];
          var columns = [];

          if (el.children[0]) { el.children[0].remove(); }
          
          //Gather unique keys 
          data.forEach(d=> {
            if (descriptions.indexOf(d.description) == -1 && d.description) {
              descriptions.push(d.description);
            } 
            if (columns.indexOf(d.month) == -1) {
              columns.push(d.month)
            } 
          })
          
          //Build a table
          var table:HTMLTableElement = document.createElement('table');
          var tHead: HTMLTableSectionElement = document.createElement('thead');
          var tBody: HTMLTableSectionElement = document.createElement('tbody');
               
          table.classList.add('datagrid table');
          
          //Build header
          
          var tRow: HTMLTableRowElement = document.createElement('tr');
          
          columns.forEach(c=>{
            var th = document.createElement('th');
            th.innerHTML = c;
            th.classList.add('col-md-1');
          })
          
          tHead.appendChild(tRow);
          table.appendChild(tHead);
          
          //Build the table body
        }
      }
    }
  }

  class forecastGridCtrl {

    static $inject = ['forecastDataSvc', '$filter', 'forecastParamSvc'];

    constructor(forecastDataSvc: Services.forecastDataSvc,
      $filter: ng.IFilterService,
      forecastParamSvc: Services.forecastParamSvc) {

    }


  }
}


