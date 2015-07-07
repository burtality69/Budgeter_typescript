budgeterServices.service('forecastParams',['$q',function () {
	
	var s = new Date();
    var e = new Date();
    e.setDate(e.getDate() + 90);
	
	var startdate = s;
	var enddate = e;
	var startbal = 0; 
	
	this.setparams = function(params) {
		startdate = params.startdate;
		enddate = params.enddate;
		startbal = params.startbal; 	
	};
	
	this.getparams = function() {
		return {
			startdate: startdate,
			enddate: enddate,
			startbal: startbal
		};
	};
	
	//Array of excluded keys for quick 'what if' style analyses
	
	var exclusions = {
		transactions: [],
		transactionValues: []
	};
	
	this.excludeTrans = function(ID) {
		exclusions.transactions.push(ID);
	};
	
	this.includeTrans = function(ID) {
		exclusions.transactions.splice(exclusions.indexOf(ID),1);
	};
	
	this.excludeTv = function(ID) {
		exclusions.transactionValues.push(ID);
		console.log('You have excluded TV' + ID);
	};
	
	this.includeTv = function(ID) {
		exclusions.transactionValues.splice(exclusions.transactionValues.indexOf(ID),1);
	};
	
}]);