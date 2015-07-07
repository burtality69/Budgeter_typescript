budgeterDirectives.directive('transactionEditor',
['ClsTransaction','transactionMgr','translistDropdowns','notifications','$rootScope','transactionValueMgr',
function (ClsTransaction, transactionMgr,transListdropdowns,notifications,$rootScope,transactionValueMgr) {
  //This has a dependency on transactionmanager which interfaces with the API

    return {
        restrict: 'EA',
        require: '^transactionList',
        scope: {
          trans: '=',
          listmgr: '='
        },
        
        bindToController: true,
        controllerAs: 'transEdit',
        controller: function ($scope,$rootScope) {
          
          var transEdit = this;
          var newrecord = false;
          
          transListdropdowns.getTransactionTypes().then(
              function(response) {
                transEdit.types = response;
              });
          
          transListdropdowns.getTransactionFrequencies().then(
            function(response) {
              transEdit.freqs = response;
            });


          //What context is this being called in?
          if (transEdit.trans == undefined) {
            transEdit.Trans = new ClsTransaction;
            newrecord = true;
          } else {
            transEdit.Trans = ClsTransaction.build(transEdit.trans);
            newrecord = false;
          };

          this.collapseTrans = function() {
            transEdit.cancel(transEdit.tv)
          }

          this.delete = function () {
            transactionValueMgr.delete(transEdit.Trans.ID).then(
              function (response) {
                transEdit.Trans.message = response;
              });
          };

          this.clear = function() {
            transEdit.tvToEdit = new ClsTransaction();
          };
          
          this.cancel = function() {
            transEdit.listmgr.addMode = false;
          };

        },
        templateUrl: "/Views/Templates/transactionEditor.html",
        
        link: function(scope,elem,attrs,ctrl) {
         scope.transEdit.submit = function() {
           ctrl.addTrans(scope.transEdit.Trans);
         };
        }
        

    };
}]);

