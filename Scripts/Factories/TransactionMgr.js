budgeterFactories.factory('transactionMgr',['$http','$q','sessionService','ClsTransaction',
function ($http, $q, sessionService, ClsTransaction) {

    var token = sessionService.getToken();
    var headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    var apiroot = sessionService.apiUrl + '/api/transactions';

    return {

    get: function() {

      var result = $q.defer();

      $http({method: 'GET',url: apiroot ,headers: headers})
          .success(function (response){
              result.resolve(response);
          })
          .error(function(response){
            result.reject(response);
          });

      return result.promise;
    },

    post: function(clsTransaction) {

        var result = $q.defer();

        var trans = angular.copy(clsTransaction);
        trans.TransactionValues[0] = clsTransaction.TransactionValues[0].formatforApi();

        $http({method: 'POST',url: apiroot,headers: headers,data: trans })
            .success(function (response) {
                result.resolve(response);
            })
            .error(function (response) {
                result.reject(response);
            });

        return result.promise;
    },

    put: function (transaction) {

        var result = $q.defer();

        $http({method: 'PUT',url: apiroot + '/' + transaction.ID, headers: headers, data: transaction})
            .success(function (response) {
                result.resolve(response);
            })
            .error(function (response) {
                result.reject(response);
            });

        return result.promise;
    },

    delete: function(id) {

        var result = $q.defer();

        $http({method: 'DELETE', url: apiroot + '/' + id, headers: headers})
            .success(function (response) {
                result.resolve(response);
            })
            .error(function (response) {
                result.reject(response);
            });

        return result.promise;
    }
  };
  
}]);

