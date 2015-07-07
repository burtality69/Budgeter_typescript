budgeterServices.service('dateParser',['$q',function() {

  return {
    getUTCDate: function(indate) {

      var d = new Date();
      var p = Date.parse(indate);

      return new Date(p + d.getTimezoneOffset()*60000);

      //return new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate()));
    }

  };
}]);
