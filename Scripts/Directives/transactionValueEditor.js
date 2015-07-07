budgeterDirectives.directive('transactionValueEditor',
['ClsTransactionValue','transactionValueMgr','translistDropdowns','notifications','$rootScope',
function (ClsTransactionValue,transactionValueMgr,translistDropdowns,notifications,$rootScope) {
// This motherfucker has it's own scope for modifying or inserting TransactionValues
// It uses an instance of the TransactionValueMgr which interacts with the REST API
// If it's called in a create context, it creates a new model, otherwise it copies an existing for edit

    return {
        restrict: 'EA',
        scope: {tvlistmgr: '='},
        require: '^transaction',       
        controllerAs: 'tvEditCtrl',
        bindToController: true,
        controller: function (translistDropdowns,notifications) {
            
            var tvEditCtrl = this;
            
            this.tv = this.tvlistmgr.tvToEdit; 
            
            var backup = ClsTransactionValue.build(this.tvlistmgr.tvToEdit);
            
            //Populate the dropdowns
            translistDropdowns.getTransactionFrequencies().then(
              function(response) {
                tvEditCtrl.frequencies = response;
            });

            //Submit a transactionvalue using post or put depending on new
            this.submit = function () {

              if (tvEditCtrl.tvlistmgr.tvToEdit.ID === undefined) {
                transactionValueMgr.post(tvEditCtrl.tv).then(
                  function (response) {
                    notifications.showSuccess({message: 'Task Updated'});
                    tvEditCtrl.tvlistmgr.addEdit = false;
                  });
              } else {
                transactionValueMgr.put(tvEditCtrl.tv).then(
                  function (response) {
                    notifications.showSuccess({message: 'Your task posted successfully'});
                    tvEditCtrl.tvlistmgr.addEdit = false;
                  });
              };
              $rootScope.$broadcast('renderChart');
            };

            this.cancel = function() {
              tvEditCtrl.tvlistmgr.addEdit = false;
              };
              
            this.delete = function () {
              transactionValueMgr.delete(tvEditCtrl.tv.ID).then(
                function (response) {
                  notifications.showSuccess({message: 'Task deleted'});
                });
            };
        },

        template: '<div class="form-inline">' +
                      '<div>' +
                          '<label for="startdate">Start Date</label>' +
                          '<input class="input-xs-flat" type="date" data-ng-model="tvEditCtrl.tv.Start_date">' +
                     '</div>' +
                      '<div>' +
                         '<label for="startdate">Occurs</label>' +
                         '<select class="input-xs-flat" type="text" ng-options="freq.ID as freq.Description for freq in tvEditCtrl.frequencies" data-ng-model="tvEditCtrl.tv.FrequencyID"></select>' +
                      '</div>' +
                      '<div>' +
                          '<label for="day">On day</label>' +
                          '<input class="input-xs-flat" type="number" min=1 data-ng-model="tvEditCtrl.tv.Day">' +
                      '</div>' +
                      '<div>' +
                          '<label for="Value">Value</label>' +
                          '<input class="input-xs-flat" type="number" step=100 data-ng-model="tvEditCtrl.tv.Value">' +
                      '</div>' +
                      '<div>' +
                          '<label for="End_date">End date</label>' +
                          '<input class="input-xs-flat" type="date" data-ng-model="tvEditCtrl.tv.End_date">' +
                      '</div>' +
                      '<div class="controlpanel" style="float: right; padding: 5px;">' +
                          '<button class="btn btn-xs btn-danger" ng-click="tvEditCtrl.cancel()">Cancel</button>' +
                          '<button class="btn btn-xs btn-success" ng-click="tvEditCtrl.submit()">Save</button>' +
                      '</div>' +
                    '</div>'
    };
}]);
