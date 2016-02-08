
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

        let render = (data: iBudgetRowModel[]) => {

          let descriptions = [];
          let columns = [];

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
          let table:HTMLTableElement = document.createElement('table');
          let tHead: HTMLTableSectionElement = document.createElement('thead');
          let tBody: HTMLTableSectionElement = document.createElement('tbody');
               
          table.classList.add('datagrid table');
          
          //Build header
          
          let tRow: HTMLTableRowElement = document.createElement('tr');
          
          columns.forEach(c=> {
            let th = document.createElement('th');
            th.innerHTML = c;
            th.classList.add('col-md-1');
          })
          
          tHead.appendChild(tRow);
          table.appendChild(tHead);
          
          descriptions.forEach(d=>{
            let row = document.createElement('tr');
            row.appendChild(document.createElement('th'))
          })
        }
      }
    }
  }

  class forecastGridCtrl {

    static $inject = ['forecastDataSvc', '$filter', 'forecastParamSvc'];

    constructor(public forecastDataSvc: Services.forecastDataSvc,
      public $filter: ng.IFilterService,
      public forecastParamSvc: Services.forecastParamSvc) {

    }
    
    refresh(){
      
    }

  }
}


