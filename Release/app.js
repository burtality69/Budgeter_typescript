///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var AuthController = (function () {
            function AuthController(authSvc, sessionService, modal) {
                this.authSvc = authSvc;
                this.sessionService = sessionService;
                this.$modal = modal;
            }
            AuthController.prototype.loggedIn = function () {
                return this.sessionService.Token !== undefined;
            };
            AuthController.prototype.openModal = function () {
                this.$modalInstance = this.$modal.open({
                    templateUrl: '/Views/Templates/LoginRegister.html',
                    controllerAs: 'loginModalCtrl',
                    controller: LoginModalController,
                    size: 'sm',
                });
            };
            AuthController.prototype.logOut = function () {
                this.sessionService.destroySession();
            };
            AuthController.$inject = ['authSvc', 'sessionService', '$modal'];
            return AuthController;
        })();
        Controllers.AuthController = AuthController;
        ;
        var LoginModalController = (function () {
            function LoginModalController(authSvc, sessionService, modalinstance, $rootScope) {
                this.authSvc = authSvc;
                this.tabs = [
                    { Header: "Log in", title: 'Login', url: 'Login.html' },
                    { Header: "Create an account", title: 'Register', url: 'Register.html' }
                ];
                this.$rootscope = $rootScope;
                this.sessionService = sessionService;
                this.$modalInstance = modalinstance;
                this.loginForm = { username: '', password: '', errorMessage: '' };
                this.registerForm = { Email: '', password: '', confirmPassword: '', errorMessage: '' };
                this.currentTab = 'Login.html';
            }
            /** hit the token endpoint, store the access token in cookies */
            LoginModalController.prototype.login = function () {
                var _this = this;
                this.authSvc.login(this.loginForm)
                    .then(function (response) {
                    _this.sessionService.Token = response.access_token;
                    _this.$modalInstance.close();
                    _this.$rootscope.$broadcast('redrawChart');
                })
                    .catch(function (err) {
                    console.log(err.message);
                });
            };
            LoginModalController.prototype.register = function (registerForm) {
                this.authSvc.register(this.registerForm)
                    .then(function (success) { return console.log(success); });
            };
            LoginModalController.prototype.onClickTab = function (tab) {
                this.currentTab = tab.url;
            };
            LoginModalController.prototype.isActiveTab = function (tabUrl) {
                return tabUrl === this.currentTab;
            };
            LoginModalController.$inject = ['authSvc', 'sessionService', '$modalInstance', '$rootScope'];
            return LoginModalController;
        })();
        Controllers.LoginModalController = LoginModalController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var sessionService = (function () {
            function sessionService($cookies) {
                this.$cookies = $cookies;
                this._apiURl = 'http://budgeter.azurewebsites.net';
                //this._apiURl = 'http://localhost:52243/'
            }
            Object.defineProperty(sessionService.prototype, "Token", {
                get: function () {
                    if (!this.$cookies.get('authToken')) {
                        return undefined;
                    }
                    return this.$cookies.get('authToken');
                },
                set: function (token) {
                    this.$cookies.put('authToken', token);
                },
                enumerable: true,
                configurable: true
            });
            ;
            /**Delete the current session, purge cookies */
            sessionService.prototype.destroySession = function () {
                this.$cookies.remove('authToken');
            };
            Object.defineProperty(sessionService.prototype, "apiURL", {
                get: function () {
                    return this._apiURl;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(sessionService.prototype, "httpGetHeaders", {
                get: function () {
                    return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.Token };
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(sessionService.prototype, "httpPostHeaders", {
                get: function () {
                    return {};
                },
                enumerable: true,
                configurable: true
            });
            sessionService.$inject = ['$cookies'];
            return sessionService;
        })();
        Services.sessionService = sessionService;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var forecastParamSvc = (function () {
            function forecastParamSvc(apiFormatSvc) {
                this.apiFormatSvc = apiFormatSvc;
                var s = new Date();
                var e = this.apiFormatSvc.lastDay(s, 3);
                this._params = { startDate: s, endDate: e, startBal: 0 };
            }
            Object.defineProperty(forecastParamSvc.prototype, "params", {
                get: function () {
                    return this._params;
                },
                set: function (p) {
                    this._params = p;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(forecastParamSvc.prototype, "apiParams", {
                get: function () {
                    return { startdate: this.apiFormatSvc.stringifyDate(this.startDate),
                        enddate: this.apiFormatSvc.stringifyDate(this.endDate),
                        startbal: this.startbal
                    };
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(forecastParamSvc.prototype, "startbal", {
                get: function () {
                    return this._params.startBal;
                },
                set: function (n) {
                    this._params.startBal = n;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(forecastParamSvc.prototype, "startDate", {
                get: function () {
                    return this._params.startDate;
                },
                set: function (d) {
                    this._params.endDate = d;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(forecastParamSvc.prototype, "endDate", {
                get: function () {
                    return this._params.endDate;
                },
                set: function (d) {
                    this._params.endDate = d;
                },
                enumerable: true,
                configurable: true
            });
            return forecastParamSvc;
        })();
        Services.forecastParamSvc = forecastParamSvc;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var transactionMgr = (function () {
            function transactionMgr($http, sessionService, apiFormatSvc) {
                this.$http = $http;
                this.sessionService = sessionService;
                this.apiFormatSvc = apiFormatSvc;
                this.$http = $http;
                this.url = sessionService.apiURL + '/api/transactions';
                this.apiFormatSvc = apiFormatSvc;
                this.sessionService = sessionService;
            }
            transactionMgr.prototype.get = function () {
                var config = {
                    method: 'GET',
                    url: this.url,
                    headers: this.sessionService.httpGetHeaders
                };
                return this.$http(config);
            };
            /**Post a single transaction model */
            transactionMgr.prototype.post = function (t) {
                var config = {
                    method: 'POST',
                    url: this.url,
                    headers: this.sessionService.httpGetHeaders,
                    data: this.apiFormatSvc.transtoServerFmt(t)
                };
                return this.$http(config);
            };
            /**Update an existing transaction model */
            transactionMgr.prototype.put = function (t) {
                var config = {
                    method: 'PUT',
                    url: this.url + '/' + t.ID,
                    headers: this.sessionService.httpGetHeaders,
                    data: this.apiFormatSvc.transtoServerFmt(t)
                };
                return this.$http(config);
            };
            transactionMgr.prototype.delete = function (ID) {
                var config = {
                    method: 'DELETE',
                    url: this.url + '/' + ID,
                    headers: this.sessionService.httpGetHeaders
                };
                return this.$http(config);
            };
            transactionMgr.prototype.newBlankTrans = function () {
                return {
                    ID: undefined,
                    Name: undefined,
                    TypeID: undefined,
                    UserID: undefined,
                    TypeDescription: undefined,
                    TransactionValues: []
                };
            };
            transactionMgr.$inject = ['$http', 'sessionService', 'apiFormatSvc'];
            return transactionMgr;
        })();
        Services.transactionMgr = transactionMgr;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var transactionValueMgr = (function () {
            function transactionValueMgr($http, sessionService, apiFormatSvc) {
                this.http = $http;
                this.url = sessionService.apiURL + '/api/transactionValues';
                this.formatter = apiFormatSvc;
                this.sessionService = sessionService;
            }
            transactionValueMgr.prototype.get = function () {
                var config = {
                    method: 'GET',
                    url: this.url,
                    headers: this.sessionService.httpGetHeaders
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.post = function (t) {
                var config = {
                    method: 'POST',
                    url: this.url,
                    headers: this.sessionService.httpGetHeaders,
                    data: this.formatter.tvtoServerFmt(t)
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.put = function (t) {
                var config = {
                    method: 'PUT',
                    url: this.url + '/' + t.ID,
                    headers: this.sessionService.httpGetHeaders,
                    data: this.formatter.tvtoServerFmt(t)
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.delete = function (ID) {
                var config = {
                    method: 'DELETE',
                    url: this.url + '/' + ID,
                    headers: this.sessionService.httpGetHeaders,
                };
                return this.http(config);
            };
            transactionValueMgr.prototype.getnewTransactionValue = function () {
                return {
                    ID: undefined,
                    TransactionID: undefined,
                    Value: undefined,
                    FrequencyID: undefined,
                    FrequencyDescription: undefined,
                    Day: undefined,
                    Start_date: undefined,
                    End_date: undefined,
                    include: true
                };
            };
            transactionValueMgr.$inject = ['$http', 'sessionService', 'apiFormatSvc'];
            return transactionValueMgr;
        })();
        Services.transactionValueMgr = transactionValueMgr;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var authSvc = (function () {
            function authSvc($http, sessionService) {
                this.http = $http;
                this.sessionSrv = sessionService;
            }
            authSvc.prototype.login = function (loginForm) {
                var config = {
                    method: 'POST',
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    url: this.sessionSrv.apiURL + '/token',
                    data: { grant_type: "password", userName: loginForm.username, password: loginForm.password },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;' }
                };
                return this.http(config);
            };
            authSvc.prototype.register = function (regForm) {
                var config = {
                    method: 'POST',
                    url: this.sessionSrv.apiURL + '/api/Account/register',
                    data: regForm,
                    headers: { 'Content-Type': 'application/json' },
                };
                return this.http(config);
            };
            authSvc.$inject = ['$http', 'sessionService'];
            return authSvc;
        })();
        Services.authSvc = authSvc;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var forecastMgr = (function () {
            function forecastMgr($http, sessionService, forecastParamSvc, $q, apiFormatSvc) {
                this.$http = $http;
                this.sessionService = sessionService;
                this.forecastParamSvc = forecastParamSvc;
                this.$q = $q;
                this.apiFormatSvc = apiFormatSvc;
                this.config = {
                    method: 'GET',
                    url: this.sessionService.apiURL + '/api/Forecast',
                    headers: this.sessionService.httpGetHeaders,
                    transformResponse: function (data) {
                        var p = JSON.parse(data);
                        return Object.keys(p).map(function (d) {
                            return p[d];
                        });
                    }
                };
            }
            /** Return a promise of forecast model {transactions[], headlines} */
            forecastMgr.prototype.getForecast = function () {
                var _this = this;
                var p = this.$q.defer();
                var ret = { transactions: undefined, headlines: undefined };
                this.config.params = this.forecastParamSvc.apiParams;
                this.$http(this.config)
                    .then(function (response) {
                    // Convert the rowmodels  
                    ret.transactions = response.data.map(function (f) {
                        return _this.apiFormatSvc.forecastRowModelToClientFormat(f);
                    });
                    ret.headlines = _this.rollupHeadlines(response.data);
                    p.resolve(ret);
                })
                    .catch(function (error) {
                    p.reject(error);
                });
                return p.promise;
            };
            /** Takes a forecast and summarises it into headlines  */
            forecastMgr.prototype.rollupHeadlines = function (data) {
                var lastrow = data[data.length - 1];
                var headlines = { balance: 0, savings: 0, incoming: 0, outgoing: 0 };
                for (var i = 0; i < data.length; i++) {
                    headlines.incoming += Math.abs(data[i].total_payments);
                    headlines.outgoing += data[i].total_deductions;
                }
                headlines.balance = lastrow.balance;
                headlines.savings = lastrow.savings;
                return headlines;
            };
            forecastMgr.$inject = ['$http', 'sessionService', 'forecastParamSvc', '$q', 'apiFormatSvc'];
            return forecastMgr;
        })();
        Services.forecastMgr = forecastMgr;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var listOptionsDataSvc = (function () {
            function listOptionsDataSvc(sessionService, $http) {
                this.http = $http;
                this.sessionService = sessionService;
            }
            Object.defineProperty(listOptionsDataSvc.prototype, "transactiontypes", {
                get: function () {
                    var config = {
                        method: 'GET',
                        url: this.sessionService.apiURL + '/api/admin/transactiontypes',
                        headers: this.sessionService.httpGetHeaders,
                    };
                    return this.http(config);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(listOptionsDataSvc.prototype, "transactionfrequencies", {
                get: function () {
                    var config = {
                        method: 'GET',
                        url: this.sessionService.apiURL + '/api/admin/transactionfrequencies',
                        headers: this.sessionService.httpGetHeaders
                    };
                    return this.http(config);
                },
                enumerable: true,
                configurable: true
            });
            listOptionsDataSvc.$inject = ['sessionService', '$http'];
            return listOptionsDataSvc;
        })();
        Services.listOptionsDataSvc = listOptionsDataSvc;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        /** Service to handle transforming API data to javascript friendly data and back */
        var apiFormatSvc = (function () {
            function apiFormatSvc() {
            }
            /**Converts a transaction in client format (dates are dates) to server format (dates = strings) */
            apiFormatSvc.prototype.transtoServerFmt = function (t) {
                var _this = this;
                return {
                    ID: t.ID,
                    Name: t.Name,
                    TypeID: t.TypeID,
                    UserID: t.UserID,
                    TypeDescription: t.TypeDescription,
                    TransactionValues: t.TransactionValues.map(function (tv) {
                        return _this.tvtoServerFmt(tv);
                    })
                };
            };
            apiFormatSvc.prototype.transtoClientFmt = function (t) {
                var _this = this;
                return {
                    ID: t.ID,
                    Name: t.Name,
                    TypeID: t.TypeID,
                    UserID: t.UserID,
                    TypeDescription: t.TypeDescription,
                    TransactionValues: t.TransactionValues.map(function (tv) {
                        return _this.tvToClientFmt(tv);
                    })
                };
            };
            apiFormatSvc.prototype.tvtoServerFmt = function (t) {
                return {
                    ID: t.ID,
                    TransactionID: t.TransactionID,
                    Value: t.Value,
                    FrequencyID: t.FrequencyID,
                    FrequencyDescription: t.FrequencyDescription,
                    Day: t.Day,
                    Start_date: this.stringifyDate(t.Start_date),
                    End_date: this.stringifyDate(t.End_date),
                    include: t.include
                };
            };
            apiFormatSvc.prototype.tvToClientFmt = function (t) {
                return {
                    ID: t.ID,
                    TransactionID: t.TransactionID,
                    Value: t.Value,
                    FrequencyID: t.FrequencyID,
                    FrequencyDescription: t.FrequencyDescription,
                    Day: t.Day,
                    Start_date: this.getUTCDate(t.Start_date),
                    End_date: this.getUTCDate(t.End_date),
                    include: true
                };
            };
            /** Converts ISO string dates to dates */
            apiFormatSvc.prototype.forecastRowModelToClientFormat = function (t) {
                return {
                    caldate: this.getUTCDate(t.caldate),
                    payment_details: t.payment_details,
                    total_payments: t.total_payments,
                    deduction_details: t.deduction_details,
                    total_deductions: t.total_deductions,
                    savings_details: t.savings_details,
                    total_savings: t.total_savings,
                    balance: t.balance,
                    savings: t.savings
                };
            };
            /** Return the last day of the month for a given date offset by x months */
            apiFormatSvc.prototype.lastDay = function (date, offset) {
                return new Date(date.getFullYear(), (date.getMonth() + 1) + offset, 0);
            };
            ;
            /** converts a date string (.net ISO8601) to UTC javascript Date */
            apiFormatSvc.prototype.getUTCDate = function (indate) {
                var p = new Date(indate);
                return new Date(p.getUTCFullYear(), p.getUTCMonth(), p.getUTCDate(), p.getUTCHours(), p.getUTCMinutes(), p.getUTCSeconds());
            };
            /** stringifies a date for API post */
            apiFormatSvc.prototype.stringifyDate = function (d) {
                return d.toLocaleDateString();
            };
            return apiFormatSvc;
        })();
        Services.apiFormatSvc = apiFormatSvc;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function forecastControls() {
            return {
                restrict: 'EA',
                templateUrl: '/Views/Templates/forecastControls.html',
                controller: Budgeter.Controllers.forecastController,
                bindToController: true,
                controllerAs: 'fCtrl',
                transclude: true,
                scope: {}
            };
        }
        Directives.forecastControls = forecastControls;
        ;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        /** Manages the viewstate and parameters for the main view */
        var forecastController = (function () {
            function forecastController($rootScope, paramSvc, apiFormatSvc) {
                this.$rootScope = $rootScope;
                this.apiFormatSvc = apiFormatSvc;
                this.parametersVisible = true;
                this.forecastview = 'graph';
                this.forecastParams = paramSvc.params;
            }
            /** advances the view date forward 1 month */
            forecastController.prototype.mthFwd = function () {
                this.forecastParams.endDate = this.apiFormatSvc.lastDay(this.forecastParams.endDate, +1);
            };
            /** steps the view date back 1 month */
            forecastController.prototype.mthBk = function () {
                this.forecastParams.endDate = this.apiFormatSvc.lastDay(this.forecastParams.endDate, -1);
            };
            forecastController.prototype.showParameters = function () {
                this.parametersVisible = !this.parametersVisible;
            };
            forecastController.prototype.refresh = function () {
                this.$rootScope.$emit('refresh');
            };
            forecastController.$inject = ['$rootScope', 'forecastParamSvc', 'apiFormatSvc'];
            return forecastController;
        })();
        Controllers.forecastController = forecastController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function headlineItem() {
            return {
                scope: {
                    name: '@',
                    value: '=',
                    icon: '@'
                },
                replace: true,
                template: '<div>' +
                    '<div class="col-lg-3 headlineimage">' +
                    '<i class="{{icon}}"></i>' +
                    '</div>' +
                    '<div class="col-lg-3">' +
                    '<span class="headlinename"> {{name}} </span>' +
                    '<span class="headlinevalue"> {{value}} </span>' +
                    '</div>' +
                    '</div>'
            };
        }
        Directives.headlineItem = headlineItem;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function stackedBar() {
            return {
                restrict: 'EA',
                bindToController: true,
                controller: Budgeter.Controllers.stackedBarController,
                controllerAs: 'graphCtrl',
                transclude: true,
                templateUrl: './Views/Templates/Stackedbar.htm',
                link: function (scope, el, att, ctrl) {
                    function render(data) {
                        //container size 
                        var margin = { top: 40, right: 40, bottom: 60, left: 40 };
                        var width = parseInt(d3.select('#forecast').style('width')) - (margin.left + margin.right);
                        var height = parseInt(d3.select('#forecast').style('height')) - (margin.top + margin.bottom);
                        //X axis 
                        var x = d3.time.scale().range([0, width]);
                        // X domain is the dates
                        x.domain(d3.extent(data, function (d) { return d.caldate; }));
                        //Y Scale
                        var y = d3.scale.linear().rangeRound([height, 0]);
                        // Y domain is the biggest negative amount to the biggest positive
                        y.domain([
                            d3.min(data, function (d) { return Math.min(d.balance, d.total_deductions); }),
                            d3.max(data, function (d) { return Math.max(d.balance, d.total_payments); })
                        ]);
                        var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient("bottom");
                        var yAxis = d3.svg.axis()
                            .scale(y)
                            .orient("left")
                            .tickFormat(d3.format(".2s"));
                        d3.select("svg").remove();
                        var svg = d3.select("#graphdiv")
                            .append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("class", "graphcanvas")
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                        //Balance line
                        var balanceline = d3.svg.line()
                            .interpolate("basis")
                            .x(function (d) { return x(d.caldate); })
                            .y(function (d) { return y(d.balance); });
                        //Savings line
                        var savingsline = d3.svg.line()
                            .interpolate("basis")
                            .x(function (d) { return x(d.caldate); })
                            .y(function (d) { return y(d.total_savings); });
                        //Create an X axis
                        svg.append("g")
                            .attr("class", "xaxis")
                            .attr("transform", "translate(0," + y(0) + ")")
                            .attr("height", height)
                            .call(xAxis)
                            .selectAll("text")
                            .style("text-anchor", "end")
                            .attr("dx", "-.8em")
                            .attr("dy", ".15em")
                            .attr("transform", function (d) { return "rotate(-65)"; });
                        //Create a Y axis
                        svg.append("g")
                            .attr("class", "yaxis")
                            .call(yAxis)
                            .append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("y", 6)
                            .attr("dy", ".71em")
                            .style("text-anchor", "end");
                        // Balance Accumulation Line 
                        svg.append("path")
                            .datum(data)
                            .attr("class", "balanceline")
                            .attr("d", balanceline);
                        // Savings Accumulation Line 
                        svg.append("path")
                            .datum(data)
                            .attr("class", "savingsline")
                            .attr("d", savingsline);
                        //Create payments 
                        var payments = svg.selectAll("payment")
                            .data(data.filter(function (d) { return Math.abs(d.total_payments) > 0; }))
                            .enter().append("rect")
                            .attr("transform", function (d) { return "translate(" + x(d.caldate) + ",0)"; })
                            .attr("width", width / data.length)
                            .attr("y", y(0))
                            .attr("height", 0)
                            .attr("class", "payment")
                            .on('click', function (d) { console.log(d); })
                            .transition().duration(1000)
                            .attr("y", function (d) { return y(d.total_payments); })
                            .attr("height", function (d) { return y(0) - y(Math.abs(d.total_payments)); });
                        //Create deductions
                        var deductions = svg.selectAll("deduction")
                            .data(data.filter(function (d) { return Math.abs(d.total_deductions) > 0; }))
                            .enter().append("rect")
                            .attr("transform", function (d) { return "translate(" + x(d.caldate) + ",0)"; })
                            .attr("width", width / data.length)
                            .attr("class", "deduction")
                            .attr("y", y(0))
                            .attr("height", 0)
                            .on("click", function (d) { console.log(d); });
                        deductions.transition().duration(1000)
                            .attr("y", y(0))
                            .attr("height", function (d) { return y(d.total_deductions) - y(0); });
                        //Create the labels
                        deductions.selectAll("svg.title")
                            .data(data)
                            .enter().append("svg:title")
                            .text(function (d) { return JSON.stringify(d); });
                        ctrl.spin = false;
                    }
                    ;
                    ctrl.forecastMgr.getForecast().then(function (data) {
                        render(data.transactions);
                    });
                    ctrl.$rootScope.$on('chartData', function () {
                        ctrl.spin = true;
                        render(ctrl.data);
                    });
                }
            };
        }
        Directives.stackedBar = stackedBar;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var stackedBarController = (function () {
            function stackedBarController($rootScope, forecastParamSvc, forecastMgr, notify) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.forecastMgr = forecastMgr;
                this.notify = notify;
                this.spin = true;
                this.params = forecastParamSvc.params;
                this.$rootScope.$on('refresh', function () { return _this.refresh(); });
            }
            stackedBarController.prototype.refresh = function () {
                var _this = this;
                this.spin = true;
                this.forecastMgr.getForecast().then(function (d) {
                    _this.data = d.transactions;
                    _this.headlines = d.headlines;
                    _this.spin = false;
                    _this.$rootScope.$emit('chartData');
                })
                    .catch(function (e) {
                    _this.notify({ message: 'Error loading data', classes: 'alert-danger' });
                });
            };
            stackedBarController.$inject = ['$rootScope', 'forecastParamSvc', 'forecastMgr', 'notify'];
            return stackedBarController;
        })();
        Controllers.stackedBarController = stackedBarController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        ;
        var transactionListController = (function () {
            function transactionListController(transactionMgr, notify, $rootScope, transactionValueMgr, apiFormatSvc) {
                this.listState = {
                    addMode: false,
                    selectedItem: null,
                    transactionToEdit: null
                };
                this.formatter = apiFormatSvc;
                this.tMgr = transactionMgr;
                this.tvMgr = transactionValueMgr;
            }
            /** get the list */
            transactionListController.prototype.refresh = function () {
                var _this = this;
                this.tMgr.get().success(function (data) {
                    _this.transactions = data.map(function (d) {
                        return _this.formatter.transtoClientFmt(d);
                    });
                })
                    .error(function (err) {
                    _this.notify({ message: 'Error loading data', classes: 'alert-danger' });
                });
            };
            transactionListController.prototype.delete = function (t, idx) {
                var _this = this;
                this.tMgr.delete(t.ID).success(function (d) {
                    _this.rootscope.$broadcast('renderChart');
                    _this.notify({ message: 'Transaction deleted', classes: 'alert-success' });
                    _this.transactions.splice(idx, 1);
                    _this.listState.selectedItem = null;
                });
            };
            transactionListController.prototype.add = function (t) {
                var _this = this;
                if (t.ID == undefined) {
                    this.tMgr.post(t)
                        .success(function (s) {
                        _this.rootscope.$broadcast('renderChart');
                        _this.notify({ message: 'Transaction added', classes: 'alert-success' });
                        _this.transactions.push(s);
                        _this.listState.addMode = false;
                    })
                        .error(function (err) {
                        return _this.notify({ message: err, classes: 'alert-danger' });
                    });
                }
                else {
                    this.tMgr.put(t).success(function (r) {
                        return _this.notify({ message: 'Transaction updated', classes: 'alert-success' });
                    });
                }
            };
            transactionListController.prototype.toggleAddForm = function () {
                this.listState.addMode = !this.listState.addMode;
            };
            /** should the passed transaction be visible? */
            transactionListController.prototype.isVisible = function (idx) {
                var t = this.listState;
                if (t.addMode) {
                    return false;
                }
                else if (t.selectedItem == null || t.selectedItem == idx) {
                    return true;
                }
            };
            transactionListController.$inject = ['transactionMgr', 'transactionValueMgr', 'notify', '$rootScope', 'apiFormatSvc'];
            return transactionListController;
        })();
        Controllers.transactionListController = transactionListController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transactionList() {
            return {
                templateUrl: 'Views/Templates/transactionList.html',
                controllerAs: 'tListCtrl',
                controller: Budgeter.Controllers.transactionListController,
                scope: {},
                link: function (scope, el, att, ctrl) {
                    ctrl.refresh();
                }
            };
        }
        Directives.transactionList = transactionList;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transaction() {
            return {
                restrict: 'EA',
                templateUrl: '/Views/Templates/Transaction.html',
                require: '^transactionList',
                bindToController: true,
                controller: Budgeter.Controllers.transactionController,
                replace: true,
                scope: false,
                link: function (scope, el, att) {
                    var v = scope.transCtrl.trans.TypeDescription;
                    var barclass = v == 'Income' ? 'payment' : (v == 'Savings' ? 'savings' : 'deduction');
                    angular.element(el[0]).addClass(barclass);
                }
            };
        }
        Directives.transaction = transaction;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transactionController = (function () {
            function transactionController($scope, transactionMgr, notify) {
                this.transactionMgr = transactionMgr;
                this.notify = notify;
                $scope.transCtrl = this;
                this.tliststate = $scope.$parent.tListCtrl.listState;
                this.trans = $scope.t;
                this.tvListState = { addEdit: false, tvToEdit: null, tID: this.trans.ID };
                this.notify = notify;
                this.transactionMgr = transactionMgr;
            }
            /**expand this transaction - trigger the contraction of all others */
            transactionController.prototype.expand = function () {
                if (!this.expanded) {
                    this.tliststate.selectedItem = this.index;
                    this.expanded = true;
                }
                else {
                    this.tliststate.selectedItem = null;
                    this.expanded = false;
                }
            };
            transactionController.prototype.editToggle = function () {
                this.tliststate.transactionToEdit = this.trans;
                this.tliststate.addMode = true;
            };
            /** inheriting from the list controller */
            transactionController.prototype.delete = function (idx) {
                var _this = this;
                this.transactionMgr.delete(this.trans.ID)
                    .success(function (d) {
                    _this.list.splice(idx, 1);
                    _this.notify({ message: 'Item deleted successfully', classes: 'alert-success' });
                })
                    .error(function (d) {
                    _this.notify({ message: 'There was a problem deleting this item', classes: 'alert-danger', duration: 5000 });
                });
            };
            transactionController.$inject = ['$scope', 'transactionMgr', 'notify'];
            return transactionController;
        })();
        Controllers.transactionController = transactionController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
///<reference path ="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transactionEditor() {
            return {
                restrict: 'EA',
                require: '^transactionList',
                scope: {
                    trans: '=',
                    liststate: '='
                },
                templateUrl: '/Views/Templates/TransactionEditor.html',
                bindToController: true,
                controllerAs: 'transEditCtrl',
                controller: Budgeter.Controllers.transactionEditorController
            };
        }
        Directives.transactionEditor = transactionEditor;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transactionEditorController = (function () {
            function transactionEditorController(transactionMgr, listOptionsDataSvc, notify) {
                this.transactionMgr = transactionMgr;
                this.listSvc = listOptionsDataSvc;
                this.notify = notify;
                this.gettransactiontypes();
                this.gettransactionvalues();
                if (this.liststate.transactionToEdit == undefined) {
                    this.trans = this.transactionMgr.newBlankTrans();
                    this.newrecord = true;
                }
                else {
                    this.trans = this.liststate.transactionToEdit;
                    this.newrecord = false;
                }
            }
            transactionEditorController.prototype.gettransactiontypes = function () {
                var _this = this;
                this.listSvc.transactionfrequencies.success(function (data) {
                    return _this.frequencies = data;
                })
                    .error(function (e) {
                    return _this.notify({ message: 'Error loading data: ' + e, classes: 'alert-danger' });
                });
            };
            transactionEditorController.prototype.gettransactionvalues = function () {
                var _this = this;
                this.listSvc.transactiontypes.success(function (data) {
                    return _this.types = data;
                })
                    .error(function (e) {
                    return _this.notify({ message: 'Error loading data: ' + e, classes: 'alert-danger' });
                });
            };
            transactionEditorController.prototype.expandToggle = function () {
                if (!this.expanded) {
                    this.expanded = true;
                    this.liststate.addMode = true;
                }
                else {
                    this.expanded = false;
                    this.liststate.addMode = false;
                }
            };
            transactionEditorController.prototype.clear = function () {
                this.trans = this.transactionMgr.newBlankTrans();
            };
            transactionEditorController.prototype.cancel = function () {
                this.liststate.addMode = false;
            };
            transactionEditorController.prototype.submit = function () {
                var _this = this;
                if (this.newrecord) {
                    this.transactionMgr.post(this.trans)
                        .success(function (t) {
                        _this.notify({ message: 'Item created successfully: ', classes: 'alert-success' });
                        _this.liststate.addMode = false;
                    })
                        .error(function (e) {
                        _this.notify({ message: 'There was a problem submitting this item: ' + e, classes: 'alert-danger' });
                    });
                }
                else {
                    this.transactionMgr.put(this.trans)
                        .success(function (t) {
                        _this.notify({ message: 'Item updated successfully: ', classes: 'alert-success' });
                        _this.liststate.addMode = false;
                    })
                        .error(function (e) {
                        _this.notify({ message: 'There was a problem updating this item: ' + e, classes: 'alert-danger' });
                    });
                }
                //this.transactionMgr.post(this.trans)
                //.success(t => )
            };
            transactionEditorController.$inject = ['transactionMgr', 'listOptionsDataSvc', 'notify'];
            return transactionEditorController;
        })();
        Controllers.transactionEditorController = transactionEditorController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transValueListController = (function () {
            function transValueListController() {
            }
            transValueListController.prototype.addNew = function () {
                this.listState.addEdit = true;
            };
            transValueListController.$inject = ['$scope'];
            return transValueListController;
        })();
        Controllers.transValueListController = transValueListController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transValuesList() {
            return {
                restrict: 'EA',
                require: 'transaction',
                templateUrl: 'Views/Templates/transactionValueList.html',
                replace: true,
                controller: Budgeter.Controllers.transValueListController,
                bindToController: true,
                controllerAs: 'tvListCtrl',
                scope: { transactionValues: '=', listState: '=' },
            };
        }
        Directives.transValuesList = transValuesList;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transactionValueController = (function () {
            function transactionValueController(transactionValueMgr, notify) {
                this.tvMgr = transactionValueMgr;
                this.notify = notify;
            }
            transactionValueController.prototype.edit = function () {
                this.liststate.tvToEdit = this.tv;
                this.liststate.addEdit = true;
            };
            transactionValueController.prototype.delete = function () {
                var _this = this;
                this.tvMgr.delete(this.tv.ID)
                    .success(function (d) {
                    _this.notify({ message: 'Item deleted successfully', classes: 'alert-success' });
                })
                    .error(function (e) {
                    _this.notify({ message: "Couldn't delete this transaction: " + e, classes: 'alert-danger' });
                });
            };
            transactionValueController.$inject = ['transactionValueMgr', 'notify'];
            return transactionValueController;
        })();
        Controllers.transactionValueController = transactionValueController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transactionValue() {
            return {
                restrict: 'EA',
                scope: { tv: '=', liststate: '=' },
                replace: true,
                controllerAs: 'tvCtrl',
                bindToController: true,
                controller: Budgeter.Controllers.transactionValueController,
                templateUrl: 'Views/Templates/transactionValue.html'
            };
        }
        Directives.transactionValue = transactionValue;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transactionValueEditorCtrl = (function () {
            function transactionValueEditorCtrl(transactionValueMgr, notify, $rootscope, listOptionsDataSvc) {
                this.listOptionsDataSvc = listOptionsDataSvc;
                this.notify = notify;
                this.transactionValueMgr = transactionValueMgr;
                if (this.listState.tvToEdit != undefined) {
                    this.tv = this.listState.tvToEdit;
                    this.newitem = false;
                }
                else {
                    this.tv = this.transactionValueMgr.getnewTransactionValue();
                    this.tv.TransactionID = this.listState.tID;
                    this.newitem = true;
                }
                this.getfrequencies();
            }
            transactionValueEditorCtrl.prototype.getfrequencies = function () {
                var _this = this;
                this.listOptionsDataSvc.transactionfrequencies
                    .success(function (d) {
                    _this.frequencies = d;
                })
                    .error(function (e) {
                    _this.notify({ message: 'There was a problem loading data', classes: 'alert-danger' });
                });
            };
            /** either post or put a transactionvalue depending on values in liststate */
            transactionValueEditorCtrl.prototype.submit = function () {
                var _this = this;
                if (this.newitem) {
                    this.transactionValueMgr.post(this.tv)
                        .success(function (d) {
                        _this.notify({ message: 'Item created successfully', classes: 'alert-success' });
                    })
                        .error(function (e) {
                        _this.notify({ message: 'There was a problem submitting the item: ' + e.message, classes: 'alert-danger' });
                    });
                }
                else {
                    this.transactionValueMgr.put(this.tv)
                        .success(function (d) {
                        _this.notify({ message: 'Item created successfully', classes: 'alert-success' });
                    })
                        .error(function (e) {
                        _this.notify({ message: 'There was a problem submitting the item: ' + e.message, classes: 'alert-danger' });
                    });
                }
            };
            transactionValueEditorCtrl.prototype.cancel = function () {
                this.listState.addEdit = false;
                this.listState.tvToEdit = undefined;
            };
            transactionValueEditorCtrl.prototype.delete = function () {
                var _this = this;
                this.transactionValueMgr.delete(this.tv.ID)
                    .success(function () {
                    _this.notify({ message: 'Item deleted successfully', classes: 'alert-success' });
                })
                    .error(function (e) {
                    _this.notify({ message: 'Error' + e.message, classes: 'alert-danger' });
                });
            };
            transactionValueEditorCtrl.$inject = ['transactionValueMgr', 'notify', '$rootScope', 'listOptionsDataSvc'];
            return transactionValueEditorCtrl;
        })();
        Controllers.transactionValueEditorCtrl = transactionValueEditorCtrl;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transactionValueEditor() {
            return {
                restrict: 'EA',
                scope: { listState: '=', transactionID: '=' },
                require: '^transaction',
                controllerAs: 'tvEditCtrl',
                bindToController: true,
                controller: Budgeter.Controllers.transactionValueEditorCtrl,
                templateUrl: 'Views/Templates/TransactionValueEditor.html'
            };
        }
        Directives.transactionValueEditor = transactionValueEditor;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
///<reference path="../../all.d.ts"/>
///<reference path="../../all.d.ts"/>
///<reference path="../../all.d.ts"/>
///<reference path="../../all.d.ts"/>
/// <reference path="../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var app = angular.module('budgeter', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngAnimate', 'cgNotify']);
    app.service('sessionService', Budgeter.Services.sessionService);
    app.service('forecastParamSvc', Budgeter.Services.forecastParamSvc);
    app.service('authSvc', Budgeter.Services.authSvc);
    app.service('apiFormatSvc', Budgeter.Services.apiFormatSvc);
    app.service('forecastMgr', Budgeter.Services.forecastMgr);
    app.service('transactionMgr', Budgeter.Services.transactionMgr);
    app.service('transactionValueMgr', Budgeter.Services.transactionValueMgr);
    app.service('listOptionsDataSvc', Budgeter.Services.listOptionsDataSvc);
    app.controller(Budgeter.Controllers);
    app.directive(Budgeter.Directives);
    var ConfigFunction = function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('!').html5Mode(true);
        $routeProvider
            .when('/login', {
            templateUrl: '/Views/Login.html',
            controller: 'AuthController'
        })
            .otherwise({
            redirectTo: '/'
        });
    };
    ConfigFunction.$inject = ['$routeProvider', '$locationProvider'];
    app.config(ConfigFunction);
})(Budgeter || (Budgeter = {}));
