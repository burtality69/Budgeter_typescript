budgeterServices.service('translistDropdowns',['sessionService','$http','$q',
function(sessionService,$http,$q) {
  
  var ctrl = this;
  
  ctrl.token = sessionService.getToken();
  ctrl.headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ctrl.token };
  ctrl.apiroot = sessionService.apiUrl;
  ctrl.Transactionfrequencies = undefined;
  ctrl.TransactionTypes = undefined;

  ctrl.getTransactionFrequencies = function() {

      var result = $q.defer();

      if(!ctrl.Transactionfrequencies) {
      $http({method: 'GET',url: ctrl.apiroot + '/api/admin/transactionfrequencies',headers: ctrl.headers})
        .success(function (response) {
            ctrl.Transactionfrequencies = response;
            result.resolve(response);
        });
      } else {
          result.resolve(ctrl.Transactionfrequencies);
      }

      return result.promise;
    };

    ctrl.getTransactionTypes = function() {
      
      var result = $q.defer();
      
      if(!ctrl.TransactionTypes) {
      $http({method: 'GET',url: sessionService.apiUrl + '/api/admin/transactiontypes',headers: ctrl.headers})
        .success(function (response) {
            ctrl.TransactionTypes = response;
            result.resolve(response);
        });
      } else {
        result.resolve(ctrl.TransactionTypes);
      }
      
      return result.promise;
  };
  
   return {
        getTransactionFrequencies: ctrl.getTransactionFrequencies,
        getTransactionTypes: ctrl.getTransactionTypes
      };
}]);
