budgeterFactories.factory('transactionValueMgr',['$http','$q','sessionService','ClsTransactionValue',
function ($http, $q, sessionService, ClsTransactionValue) {

    var token = sessionService.getToken();
    var headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    var apiroot = sessionService.apiUrl + '/api/transactionValues';

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

    post: function(ClsTransactionValue) {

        var result = $q.defer();

        //var tv = ClsTransactionValue.formatforApi();

        $http({method: 'POST',url: apiroot ,headers: headers,data: ClsTransactionValue.formatforApi() })
            .success(function (response) {
                result.resolve(response);
            })
            .error(function (response) {
                result.reject(response);
            });

        return result.promise;
    },

    put: function (ClsTransactionValue) {

        var result = $q.defer();

        $http({method: 'PUT', url: apiroot + '/' + ClsTransactionValue.ID, headers: headers, data: ClsTransactionValue.formatforApi()})
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

        $http({method: 'DELETE',url: apiroot + '/' + id , headers: headers})
            .success(function (response) {
                result.resolve(response);
            })
            .error(function (response) {
                result.reject(response);
            });

        return result.promise;
    }
  }
}]);
