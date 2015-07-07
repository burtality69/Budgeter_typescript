budgeterFactories.factory('budgetMgr',['$http','$q','sessionService',
function($http, $q, sessionService) {

  var token = sessionService.getToken();
  var headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
  var apiroot = sessionService.apiUrl;

  return {

    getBudget: function (params) {

        var result = $q.defer();
        var querystring = '?startdate=' + params.startdate.toLocaleDateString('en-US') + '&enddate=' + params.enddate.toLocaleDateString('en-US');

        $http({method: 'GET',url: apiroot + '/api/forecast/getbudget' + querystring , headers: headers})
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

