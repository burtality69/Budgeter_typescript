///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var AuthController = (function () {
            function AuthController(authSvc, sessionService, $modal) {
                this.authSvc = authSvc;
                this.sessionService = sessionService;
                this.$modal = $modal;
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
            function LoginModalController(authSvc, sessionService, $modalInstance, $rootScope) {
                this.authSvc = authSvc;
                this.sessionService = sessionService;
                this.$modalInstance = $modalInstance;
                this.$rootScope = $rootScope;
                this.tabs = [
                    { Header: "Log in", title: 'Login', url: 'Login.html' },
                    { Header: "Create an account", title: 'Register', url: 'Register.html' }
                ];
                this.loginForm = { username: '', password: '', errorMessage: '' };
                this.registerForm = { Email: '', password: '', confirmPassword: '', errorMessage: '' };
                this.currentTab = 'Login.html';
            }
            /** hit the token endpoint, store the access token in cookies */
            LoginModalController.prototype.login = function () {
                var _this = this;
                this.authSvc.login(this.loginForm)
                    .then(function (response) {
                    _this.sessionService.Token = response.data.access_token;
                    _this.$modalInstance.close();
                    _this.$rootScope.$broadcast('redrawChart');
                })
                    .catch(function (err) {
                    _this.loginForm.errorMessage = err.message;
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
            Object.defineProperty(forecastParamSvc.prototype, "queryString", {
                get: function () {
                    var qs = '?startdate=' + this.apiFormatSvc.dateforQueryString(this.startDate) + '&enddate='
                        + this.apiFormatSvc.dateforQueryString(this.endDate) + '&startbal=' + this.startbal;
                    return qs;
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
        var trxDataService = (function () {
            function trxDataService($http, sessionService, apiFormatSvc) {
                this.$http = $http;
                this.sessionService = sessionService;
                this.apiFormatSvc = apiFormatSvc;
                this.url = sessionService.apiURL + '/api/transactions';
            }
            trxDataService.prototype.get = function () {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    var config = {
                        method: 'GET',
                        url: _this.url,
                        headers: _this.sessionService.httpGetHeaders,
                        transformResponse: function (d, h) { return (_this.apiFormatSvc.transtoClientFmt(d)); }
                    };
                    _this.$http(config)
                        .then(function (d) { return resolve(d.data); })
                        .catch(function (e) { reject(e); });
                });
            };
            /**Post a single transaction model */
            trxDataService.prototype.post = function (t) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    var config = {
                        method: 'POST',
                        url: _this.url,
                        headers: _this.sessionService.httpGetHeaders,
                        data: _this.apiFormatSvc.transtoServerFmt(t)
                    };
                    _this.$http(config)
                        .then(function (d) { resolve(d); })
                        .catch(function (e) { reject(e); });
                });
            };
            /**Update an existing transaction model */
            trxDataService.prototype.put = function (t) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    var config = {
                        method: 'PUT',
                        url: _this.url + '/' + t.ID,
                        headers: _this.sessionService.httpGetHeaders,
                        data: _this.apiFormatSvc.transtoServerFmt(t)
                    };
                    _this.$http(config)
                        .then(function (d) { return resolve(d); })
                        .catch(function (e) { return reject(e); });
                });
            };
            trxDataService.prototype.delete = function (ID) {
                var config = {
                    method: 'DELETE',
                    url: this.url + '/' + ID,
                    headers: this.sessionService.httpGetHeaders
                };
                return this.$http(config);
            };
            trxDataService.prototype.newBlankTrans = function () {
                return {
                    ID: undefined,
                    Name: undefined,
                    TypeID: undefined,
                    UserID: undefined,
                    TypeDescription: undefined,
                    TransactionValues: []
                };
            };
            trxDataService.$inject = ['$http', 'sessionService', 'apiFormatSvc'];
            return trxDataService;
        })();
        Services.trxDataService = trxDataService;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var trxdetailDataSvc = (function () {
            function trxdetailDataSvc($http, sessionService, apiFormatSvc) {
                this.$http = $http;
                this.sessionService = sessionService;
                this.apiFormatSvc = apiFormatSvc;
                this.url = sessionService.apiURL + '/api/transactionValues';
            }
            trxdetailDataSvc.prototype.get = function () {
                var config = {
                    method: 'GET',
                    url: this.url,
                    headers: this.sessionService.httpGetHeaders
                };
                return this.$http(config);
            };
            trxdetailDataSvc.prototype.post = function (t) {
                var config = {
                    method: 'POST',
                    url: this.url,
                    headers: this.sessionService.httpGetHeaders,
                    data: this.apiFormatSvc.tvtoServerFmt(t)
                };
                return this.$http(config);
            };
            trxdetailDataSvc.prototype.put = function (t) {
                var config = {
                    method: 'PUT',
                    url: this.url + '/' + t.ID,
                    headers: this.sessionService.httpGetHeaders,
                    data: this.apiFormatSvc.tvtoServerFmt(t)
                };
                return this.$http(config);
            };
            trxdetailDataSvc.prototype.delete = function (ID) {
                var config = {
                    method: 'DELETE',
                    url: this.url + '/' + ID,
                    headers: this.sessionService.httpGetHeaders,
                };
                return this.$http(config);
            };
            trxdetailDataSvc.prototype.getnewTransactionValue = function (TransactionID) {
                return {
                    ID: undefined,
                    TransactionID: TransactionID,
                    Value: undefined,
                    FrequencyID: undefined,
                    FrequencyDescription: undefined,
                    Day: undefined,
                    Start_date: undefined,
                    End_date: undefined,
                    include: true
                };
            };
            trxdetailDataSvc.$inject = ['$http', 'sessionService', 'apiFormatSvc'];
            return trxdetailDataSvc;
        })();
        Services.trxdetailDataSvc = trxdetailDataSvc;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var authSvc = (function () {
            function authSvc($http, sessionService) {
                this.$http = $http;
                this.sessionService = sessionService;
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
                    url: this.sessionService.apiURL + '/token',
                    data: { grant_type: "password", userName: loginForm.username, password: loginForm.password },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;' }
                };
                return this.$http(config);
            };
            authSvc.prototype.register = function (regForm) {
                var config = {
                    method: 'POST',
                    url: this.sessionService.apiURL + '/api/Account/register',
                    data: regForm,
                    headers: { 'Content-Type': 'application/json' },
                };
                return this.$http(config);
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
        var forecastDataSvc = (function () {
            function forecastDataSvc($http, sessionService, forecastParamSvc, apiFormatSvc) {
                this.$http = $http;
                this.sessionService = sessionService;
                this.forecastParamSvc = forecastParamSvc;
                this.apiFormatSvc = apiFormatSvc;
            }
            /** Return a promise of forecast model {transactions[], headlines} */
            forecastDataSvc.prototype.getForecast = function () {
                var _this = this;
                var baseUrl = this.sessionService.apiURL + '/api/Forecast';
                var config = {
                    method: 'GET',
                    url: baseUrl,
                    headers: this.sessionService.httpGetHeaders,
                    data: '',
                    transformResponse: function (data) {
                        var p = JSON.parse(data);
                        return Object.keys(p).map(function (d) { return p[d]; });
                    }
                };
                var ret = { transactions: undefined, headlines: undefined };
                config.url = baseUrl + this.forecastParamSvc.queryString;
                config.headers = this.sessionService.httpGetHeaders;
                return new Promise(function (resolve, reject) {
                    _this.$http(config)
                        .then(function (response) {
                        ret.transactions = response.data.map(function (f) { return _this.apiFormatSvc.forecastRowModelToClientFormat(f); });
                        ret.headlines = _this.rollupHeadlines(response.data);
                        resolve(ret);
                    })
                        .catch(function (error) {
                        reject(error);
                    });
                });
            };
            /** Takes a forecast and summarises it into headlines  */
            forecastDataSvc.prototype.rollupHeadlines = function (data) {
                var lastrow = data[data.length - 1];
                var incoming = 0;
                var outgoing = 0;
                var bal = lastrow.balance;
                var sav = lastrow.savings;
                for (var i = 0; i < data.length; i++) {
                    incoming += Math.abs(data[i].total_payments);
                    outgoing += data[i].total_deductions;
                }
                var headlines = {
                    balance: bal,
                    savings: sav,
                    incoming: incoming,
                    outgoing: outgoing
                };
                return headlines;
            };
            forecastDataSvc.prototype.getBudget = function () {
                var baseUrl = this.sessionService.apiURL + '/api/Forecast/getbudget';
                var config = {
                    method: 'GET',
                    url: baseUrl,
                    headers: this.sessionService.httpGetHeaders,
                    data: '',
                    transformResponse: function (data) {
                        var p = JSON.parse(data);
                        return Object.keys(p).map(function (d) {
                            return p[d];
                        });
                    }
                };
                return this.$http(config);
            };
            forecastDataSvc.$inject = ['$http', 'sessionService', 'forecastParamSvc', 'apiFormatSvc'];
            return forecastDataSvc;
        })();
        Services.forecastDataSvc = forecastDataSvc;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var listOptionsDataSvc = (function () {
            function listOptionsDataSvc(sessionService, $http) {
                this.sessionService = sessionService;
                this.$http = $http;
            }
            Object.defineProperty(listOptionsDataSvc.prototype, "transactiontypes", {
                get: function () {
                    var config = {
                        method: 'GET',
                        url: this.sessionService.apiURL + '/api/admin/transactiontypes',
                        headers: this.sessionService.httpGetHeaders,
                    };
                    return this.$http(config);
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
                    return this.$http(config);
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
            apiFormatSvc.prototype.dateforQueryString = function (d) {
                var y = d.getFullYear();
                var m = d.getMonth() + 1;
                var dy = d.getDate();
                var mth = m < 10 ? '0' + m : m;
                var day = dy < 10 ? '0' + dy : dy;
                var r = y + '-' + mth + '-' + day;
                return r;
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
                controller: forecastController,
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
/** Manages the viewstate and parameters for the main view */
var forecastController = (function () {
    function forecastController($rootScope, paramSvc, apiFormatSvc) {
        this.$rootScope = $rootScope;
        this.paramSvc = paramSvc;
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
    /** Toggles the parameter view */
    forecastController.prototype.showParameters = function () {
        this.parametersVisible = !this.parametersVisible;
    };
    /** Sends refresh on the rootscope */
    forecastController.prototype.refresh = function () {
        this.$rootScope.$emit('refresh');
    };
    forecastController.$inject = ['$rootScope', 'forecastParamSvc', 'apiFormatSvc'];
    return forecastController;
})();
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
                controller: stackedBarController,
                controllerAs: 'ctrl',
                transclude: true,
                templateUrl: './Views/Templates/Stackedbar.htm',
                link: function (s, e, a) {
                    var panel = d3.select('#forecast');
                    function render(data) {
                        //container size 
                        var margin = { top: 40, right: 40, bottom: 60, left: 40 };
                        var width = 700 - (margin.left + margin.right);
                        var height = 500 - (margin.top + margin.bottom);
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
                            .on('click', function (d) { return console.log(d); });
                        payments.transition()
                            .duration(1000)
                            .attr("y", function (d) { return y(d.total_payments); })
                            .attr("height", function (d) { return y(0) - y(Math.abs(d.total_payments)); });
                        //Create deductions
                        var deductions = svg.selectAll("deduction")
                            .data(data.filter(function (d) { return Math.abs(d.total_deductions) > 0; }))
                            .enter().append("rect")
                            .attr("transform", function (d) { return ("translate(" + x(d.caldate) + ",0)"); })
                            .attr("width", width / data.length)
                            .attr("class", "deduction")
                            .attr("y", y(0))
                            .attr("height", 0)
                            .on("click", function (d) { console.log(d); });
                        deductions.transition()
                            .duration(1000)
                            .attr("y", y(0))
                            .attr("height", function (d) { return y(d.total_deductions) - y(0); });
                        //Create the labels
                        deductions.selectAll("svg.title")
                            .data(data)
                            .enter().append("svg:title")
                            .text(function (d) { return JSON.stringify(d); });
                        s.ctrl.spin = false;
                    }
                    ;
                    refresh();
                    function refresh() {
                        s.ctrl.spin = true;
                        s.ctrl.getData()
                            .then(function (data) { return render(data.transactions); })
                            .catch(function (e) { return s.ctrl.notify({ message: "Problem loading: " + e.message, classes: 'alert-danger' }); });
                    }
                    s.ctrl.$rootScope.$on('refresh', function () {
                        refresh();
                    });
                }
            };
        }
        Directives.stackedBar = stackedBar;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
var stackedBarController = (function () {
    function stackedBarController($rootScope, forecastDataSvc, notify) {
        this.$rootScope = $rootScope;
        this.forecastDataSvc = forecastDataSvc;
        this.notify = notify;
        this.spin = true;
    }
    stackedBarController.prototype.getData = function () {
        return this.forecastDataSvc.getForecast();
    };
    stackedBarController.$inject = ['$rootScope', 'forecastDataSvc', 'notify'];
    return stackedBarController;
})();
///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Directives;
    (function (Directives) {
        function transactionList() {
            return {
                templateUrl: 'Views/Templates/transactionList.html',
                controllerAs: 'tListCtrl',
                controller: transactionListController,
                scope: {},
                link: function (scope, el, att, ctrl) {
                    ctrl.refresh();
                }
            };
        }
        Directives.transactionList = transactionList;
        ;
        var transactionListController = (function () {
            function transactionListController(transactionMgr, notify, $rootScope, transactionValueMgr, apiFormatSvc) {
                this.transactionMgr = transactionMgr;
                this.notify = notify;
                this.$rootScope = $rootScope;
                this.transactionValueMgr = transactionValueMgr;
                this.apiFormatSvc = apiFormatSvc;
                this.listState = {
                    addMode: false,
                    selectedItem: null,
                    transactionToEdit: null
                };
            }
            /** get the list */
            transactionListController.prototype.refresh = function () {
                var _this = this;
                this.transactionMgr.get()
                    .then(function (data) {
                    _this.transactions = data.map(function (d) { return _this.apiFormatSvc.transtoClientFmt(d); });
                })
                    .catch(function (err) {
                    _this.notify({ message: 'Error loading data', classes: 'alert-danger' });
                });
            };
            transactionListController.prototype.delete = function (t, idx) {
                var _this = this;
                this.transactionMgr.delete(t.ID)
                    .then(function (d) {
                    _this.$rootScope.$broadcast('renderChart');
                    _this.notify({ message: 'Transaction deleted', classes: 'alert-success' });
                    _this.transactions.splice(idx, 1);
                    _this.listState.selectedItem = null;
                })
                    .catch(function (e) {
                    _this.notify({ message: 'There was a problem deleting the item ' + e, classes: 'alert-danger' });
                });
            };
            transactionListController.prototype.add = function (t) {
                var _this = this;
                if (t.ID == undefined) {
                    this.transactionMgr.post(t)
                        .then(function (s) {
                        _this.$rootScope.$broadcast('renderChart');
                        _this.notify({ message: 'Transaction added', classes: 'alert-success' });
                        _this.transactions.push(s);
                        _this.toggleAddForm();
                    })
                        .catch(function (err) {
                        return _this.notify({ message: err, classes: 'alert-danger' });
                    });
                }
                else {
                    this.transactionMgr.put(t)
                        .then(function (r) {
                        _this.notify({ message: 'Transaction updated', classes: 'alert-success' });
                    })
                        .catch(function (e) {
                        _this.notify({ message: 'There was a problem updating the item ' + e, classes: 'alert-danger' });
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
                controller: transactionController,
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
var transactionController = (function () {
    function transactionController($scope, trxService, notify) {
        this.trxService = trxService;
        this.notify = notify;
        $scope.transCtrl = this;
        this.tliststate = $scope.$parent.tListCtrl.listState;
        this.trans = $scope.t;
        this.tvListState = { addEdit: false, tvToEdit: null, tID: this.trans.ID };
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
        this.trxService.delete(this.trans.ID)
            .then(function (d) {
            _this.list.splice(idx, 1);
            _this.notify({ message: 'Item deleted successfully', classes: 'alert-success' });
        })
            .catch(function (e) {
            _this.notify({ message: "Problem deleting: " + e.message, classes: 'alert-danger' });
        });
    };
    transactionController.$inject = ['$scope', 'transactionMgr', 'notify'];
    return transactionController;
})();
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
                this.listOptionsDataSvc = listOptionsDataSvc;
                this.notify = notify;
                this.listSvc = listOptionsDataSvc;
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
                this.listSvc.transactionfrequencies
                    .then(function (data) {
                    return _this.frequencies = data;
                })
                    .catch(function (e) {
                    return _this.notify({ message: 'Error loading data: ' + e, classes: 'alert-danger' });
                });
            };
            transactionEditorController.prototype.gettransactionvalues = function () {
                var _this = this;
                this.listSvc.transactiontypes
                    .then(function (data) {
                    return _this.types = data;
                })
                    .catch(function (e) {
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
                        .then(function (t) {
                        _this.notify({ message: 'Item created successfully: ', classes: 'alert-success' });
                        _this.liststate.addMode = false;
                    })
                        .catch(function (e) {
                        _this.notify({ message: 'There was a problem submitting this item: ' + e, classes: 'alert-danger' });
                    });
                }
                else {
                    this.transactionMgr.put(this.trans)
                        .then(function (t) {
                        _this.notify({ message: 'Item updated successfully: ', classes: 'alert-success' });
                        _this.liststate.addMode = false;
                    })
                        .catch(function (e) {
                        _this.notify({ message: 'There was a problem updating this item: ' + e, classes: 'alert-danger' });
                    });
                }
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
            return transValueListController;
        })();
        Controllers.transValueListController = transValueListController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
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
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transactionValueController = (function () {
            function transactionValueController(transactionValueMgr, notify) {
                this.transactionValueMgr = transactionValueMgr;
                this.notify = notify;
            }
            transactionValueController.prototype.edit = function () {
                this.liststate.tvToEdit = this.tv;
                this.liststate.addEdit = true;
            };
            transactionValueController.prototype.delete = function () {
                var _this = this;
                this.transactionValueMgr.delete(this.tv.ID)
                    .then(function (d) {
                    _this.notify({ message: 'Item deleted successfully', classes: 'alert-success' });
                })
                    .catch(function (e) {
                    _this.notify({ message: "Couldn't delete this transaction: " + e, classes: 'alert-danger' });
                });
            };
            transactionValueController.$inject = ['transactionValueMgr', 'notify'];
            return transactionValueController;
        })();
        Controllers.transactionValueController = transactionValueController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
///<reference path="../../all.d.ts"/>
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
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var transactionValueEditorCtrl = (function () {
            function transactionValueEditorCtrl(transactionValueMgr, notify, $rootscope, listOptionsDataSvc) {
                this.transactionValueMgr = transactionValueMgr;
                this.notify = notify;
                this.$rootscope = $rootscope;
                this.listOptionsDataSvc = listOptionsDataSvc;
                // If there's already a transactionvalue to edit then load it - otherwise give us a new one. 
                if (this.listState.tvToEdit != undefined) {
                    this.tv = this.listState.tvToEdit;
                    this.newitem = false;
                }
                else {
                    this.tv = this.transactionValueMgr.getnewTransactionValue(this.listState.tID);
                    this.newitem = true;
                }
                this.getfrequencies();
            }
            /** Load available transaction frequencies to the dropdown list */
            transactionValueEditorCtrl.prototype.getfrequencies = function () {
                var _this = this;
                this.listOptionsDataSvc.transactionfrequencies
                    .then(function (d) {
                    _this.frequencies = d;
                })
                    .catch(function (e) {
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
                        _this.clearandClose();
                    })
                        .error(function (e) {
                        _this.notify({ message: 'There was a problem submitting the item: ' + e.message, classes: 'alert-danger' });
                    });
                }
                else {
                    this.transactionValueMgr.put(this.tv)
                        .success(function (d) {
                        _this.notify({ message: 'Item created successfully', classes: 'alert-success' });
                        _this.clearandClose();
                    })
                        .error(function (e) {
                        _this.notify({ message: 'There was a problem submitting the item: ' + e.message, classes: 'alert-danger' });
                    });
                }
            };
            transactionValueEditorCtrl.prototype.clearandClose = function () {
                this.listState.addEdit = false;
                this.listState.tvToEdit = undefined;
            };
            transactionValueEditorCtrl.prototype.delete = function () {
                var _this = this;
                this.transactionValueMgr.delete(this.tv.ID)
                    .then(function () {
                    _this.notify({ message: 'Item deleted successfully', classes: 'alert-success' });
                    _this.clearandClose();
                })
                    .catch(function (e) {
                    _this.notify({ message: 'Error' + e.message, classes: 'alert-danger' });
                });
            };
            transactionValueEditorCtrl.$inject = ['trxdetailDataSvc', 'notify', '$rootScope', 'listOptionsDataSvc'];
            return transactionValueEditorCtrl;
        })();
        Controllers.transactionValueEditorCtrl = transactionValueEditorCtrl;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
/// <reference path="../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var app = angular.module('budgeter', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngAnimate', 'cgNotify'])
        .service('sessionService', Budgeter.Services.sessionService)
        .service('forecastParamSvc', Budgeter.Services.forecastParamSvc)
        .service('authSvc', Budgeter.Services.authSvc)
        .service('apiFormatSvc', Budgeter.Services.apiFormatSvc)
        .service('forecastDataSvc', Budgeter.Services.forecastDataSvc)
        .service('trxDataService', Budgeter.Services.trxDataService)
        .service('trxdetailDataSvc', Budgeter.Services.trxdetailDataSvc)
        .service('listOptionsDataSvc', Budgeter.Services.listOptionsDataSvc)
        .controller(Budgeter.Controllers)
        .directive(Budgeter.Directives);
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
