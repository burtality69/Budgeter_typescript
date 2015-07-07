budgeterDirectives.directive('transactionValue',['ClsTransactionValue','transactionValueMgr','notifications','$rootScope', 
function (ClsTransactionValue,transactionValueMgr,notifications,$rootScope) {
// This is a

    return {
        restrict: 'EA',
        scope: {tv: '=',tvlistmgr: '='},
        replace: true,
        transclude: true,
        controllerAs: 'tvCtrl',
        bindToController: true,
        controller: function () {
            
            var tvCtrl = this;
            
            this.edit = function(ID) {
                tvCtrl.tvlistmgr.addEdit = true;
                tvCtrl.tvlistmgr.tvToEdit = tvCtrl.tv;
            };
            
            this.delete = function () {
              transactionValueMgr.delete(tvCtrl.tv.ID).then(
                function (response) {
                  notifications.showSuccess({message: 'Task Deleted'});
                });
            };
            
            this.toggleInclude = function () {
                transactionValueMgr.put(tvCtrl.tv).then(
                  function () {$rootScope.$broadcast('renderChart');
                  });
            };
        },
        template: '<li class="transactionvalue list-group-item clearfix">' +
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
    };
}]);
