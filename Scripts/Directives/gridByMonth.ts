/// <reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../all.d.ts"/>"
budgeterDirectives.directive('gridByMonth',['budgetMgr','clsBudgetModel','$filter','forecastParams',
function(budgetMgr,clsBudgetModel,$filter,forecastParams) {

  return {
    restrict: 'EA',
    bindToController: true,
    controllerAs: 'gridCtrl',
    require: '^forecastControls',
    scope: {params: '='},
    transclude: true,
    controller: function($scope) {

      var gridCtrl = this;
      
      this.budgetdata = [];
      
      this.refresh = function() {
          budgetMgr.getBudget(gridCtrl.params).then(
            function(response){
              gridCtrl.budgetdata = response.map(clsBudgetModel.build);
            });
      };

    },
   
    link: function(scope,elem,attrs,fCtrl) {
      
      scope.gridCtrl.renderGrid = function (data) {
        
         var grid = <HTMLTableElement> document.querySelector('.gridByMonth');
         
         if(grid.children[0]) {
           grid.children[0].remove();
         }
         
         var descriptions = [];
         var columns = [];

         //Gather descriptions
         for (var i=0; i < data.length; i++) {
           if (descriptions.indexOf(data[i].Description) === -1 && data[i].Description !== undefined)
              {
                descriptions.push(data[i].Description);
              }
         }

         //Put dates into columns
          for (var i = 0; i < data.length; i++) {
            var v = data[i].Month; 
            if (columns.indexOf(v) == -1) {
                columns.push(v);
            }
          }
          
         //Create a table
         var table = angular.element('<table>');
         table.addClass("datagrid table");
         var tblbody = angular.element("<tbody>");
         var thead = angular.element('<thead>');
         var row = angular.element('<tr>');
         
         row.appendChild('<th></th>');

         //Build header
         for (var a = 0; a < columns.length; a++) {
           var th = angular.element('<th class="col-md-1">' + columns[a] + '</th>');
           row.append(th);
         }
         
         thead.append(row); 
         table.append(thead);

         // Build the rows                
         for (var j =0; j < descriptions.length; j++) {
           var row = angular.element("<tr>");
           row.append('<th class="col-md-1">' + descriptions[j] + '</th>');

           var filtered = $filter('filter')(data, descriptions[j]);
           
           for (i =0; i < columns.length; i++) {
             var rowdata = $filter('filter')(filtered, columns[i]);
             if(rowdata.length > 0) {
               var txt = rowdata[0].Amount;
             } else {
               txt = "";
             }
             row.append('<td class="col-sm-1">'+ txt + '</td>');
           }
           
           tblbody.append(row);
         
         }

        table.append(tblbody);
        elem.append(table);
        
        scope.gridCtrl.budgetdata = [];
              
      };
      
      scope.gridCtrl.refresh(scope.gridCtrl.params);
      
      scope.$watch(function(){return scope.gridCtrl.budgetdata;},
        function(newVal,oldVal) {
          if (newVal !== oldVal && newVal.length > 0) {  
            scope.gridCtrl.renderGrid(newVal);
            }
        },true);
      
      scope.$on('renderGrid', function() {
        //elem.children[0].remove();
        scope.gridCtrl.refresh();
      });
    }  
  };
}]);
