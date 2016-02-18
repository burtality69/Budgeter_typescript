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
                    .then(function (r) {
                    _this.sessionService.Token = r.data.access_token;
                    _this.$modalInstance.close();
                    _this.$rootScope.$emit('refresh');
                })
                    .catch(function (err) {
                    _this.loginForm.errorMessage = err.data.error_description;
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
                        transformResponse: function (d, h) {
                            var p = JSON.parse(d);
                            return p.map(function (d) {
                                return _this.apiFormatSvc.transtoClientFmt(d);
                            });
                        }
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
        var TrxList = (function () {
            function TrxList($rootScope, trxDataSvc, notify) {
                this.$rootScope = $rootScope;
                this.trxDataSvc = trxDataSvc;
                this.notify = notify;
                this._list = [];
                this.load();
            }
            TrxList.prototype.add = function (t) {
                this._list.push(t);
                this.broadcastChange();
            };
            /** return the index of element with the given ID */
            TrxList.prototype.find = function (id) {
                for (var i = 0; i < this._list.length; i++) {
                    if (this._list[i].ID == id) {
                        return i;
                    }
                }
            };
            /**Return element by ID */
            TrxList.prototype.element = function (id) {
                return this.list[this.find(id)];
            };
            /** Remove item from list -return a promise */
            TrxList.prototype.remove = function (id) {
                var _this = this;
                return new Promise(function (res, rej) {
                    try {
                        _this._list.splice(_this.find(id), 1);
                        _this.broadcastChange();
                        res("Trx " + id + " deleted successfully");
                    }
                    catch (e) {
                        rej(e);
                    }
                });
            };
            TrxList.prototype.edit = function () {
            };
            /** Populate the underlying list from the data service */
            TrxList.prototype.load = function () {
                var _this = this;
                this.trxDataSvc.get()
                    .then(function (d) { return _this._list = d; })
                    .catch(function (e) { return _this.notify({ message: "Error loading data " + e.message, classes: 'alert-danger' }); });
            };
            TrxList.prototype.broadcastChange = function () {
                this.$rootScope.$emit('refresh');
            };
            Object.defineProperty(TrxList.prototype, "list", {
                get: function () {
                    return this._list;
                },
                enumerable: true,
                configurable: true
            });
            TrxList.$inject = ['$rootScope', 'trxDataService', 'notify'];
            return TrxList;
        })();
        Services.TrxList = TrxList;
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
                var _this = this;
                this.sessionService = sessionService;
                this.$http = $http;
                this.getTrxTypes()
                    .then(function (d) { return _this.trxTypes = d.data; });
                this.getTrxFrequencies()
                    .then(function (d) { return _this.trxFreqs = d.data; });
            }
            listOptionsDataSvc.prototype.getTrxTypes = function () {
                var config = {
                    method: 'GET',
                    url: this.sessionService.apiURL + '/api/admin/transactiontypes',
                    headers: this.sessionService.httpGetHeaders,
                };
                return this.$http(config);
            };
            listOptionsDataSvc.prototype.getTrxFrequencies = function () {
                var config = {
                    method: 'GET',
                    url: this.sessionService.apiURL + '/api/admin/transactionfrequencies',
                    headers: this.sessionService.httpGetHeaders
                };
                return this.$http(config);
            };
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
                var tvs = t.TransactionValues.map(function (tv) {
                    return _this.tvToClientFmt(tv);
                });
                var today = new Date();
                var curVal = tvs.filter(function (t) { return (t.Start_date <= today && t.End_date >= today); });
                return {
                    ID: t.ID,
                    Name: t.Name,
                    TypeID: t.TypeID,
                    UserID: t.UserID,
                    TypeDescription: t.TypeDescription,
                    TransactionValues: tvs,
                    CurrentValue: curVal.length ? curVal[0].Value : 0
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
                templateUrl: '/Components/ForecastControls/forecastControls.htm',
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
                templateUrl: './Components/Stackedbar/Stackedbar.htm',
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
                        s.$apply;
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
                templateUrl: './Components/TrxList/transactionList.htm',
                controllerAs: 'ctrl',
                controller: trxListController,
                scope: {},
                link: function (s, e, a) { }
            };
        }
        Directives.transactionList = transactionList;
        var trxListController = (function () {
            function trxListController(trxList, notify, $modal) {
                this.trxList = trxList;
                this.notify = notify;
                this.$modal = $modal;
            }
            trxListController.prototype.view = function (id) {
                var t = this.trxList.element(id);
                this.$modalInstance = this.$modal.open({
                    templateUrl: '/Components/TrxList/trxEditModal.htm',
                    controllerAs: 'ctrl',
                    controller: trxModalCtrl,
                    bindToController: true,
                    size: 'md',
                    resolve: { trx: function () { return t; } }
                });
            };
            trxListController.$inject = ['trxList', 'notify', '$modal'];
            return trxListController;
        })();
        var trxModalCtrl = (function () {
            function trxModalCtrl(trxList, listOptionsDataSvc, $modalInstance, trx) {
                this.trxList = trxList;
                this.listOptionsDataSvc = listOptionsDataSvc;
                this.$modalInstance = $modalInstance;
                this.trx = trx;
                this.trxTypes = this.listOptionsDataSvc.trxTypes;
                this.trxFreqs = this.listOptionsDataSvc.trxFreqs;
            }
            trxModalCtrl.prototype.close = function () {
                this.$modalInstance.close();
            };
            trxModalCtrl.$inject = ['trxList', 'listOptionsDataSvc', '$modalInstance', 'trx'];
            return trxModalCtrl;
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
                templateUrl: '/Components/Trx/Transaction.htm',
                require: '^transactionList',
                bindToController: true,
                controller: transactionController,
                controllerAs: 'ctrl',
                replace: true,
                scope: { trx: '=' },
                link: function (s, e, a) {
                    var v = s.ctrl.trx.TypeDescription;
                    var barclass = v == 'Income' ? 'payment' : (v == 'Savings' ? 'savings' : 'deduction');
                    angular.element(e[0]).addClass(barclass);
                }
            };
        }
        Directives.transaction = transaction;
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
})(Budgeter || (Budgeter = {}));
var transactionController = (function () {
    function transactionController(notify) {
    }
    transactionController.$inject = ['notify'];
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
            function transactionEditorController(trxDataService, listOptionsDataSvc, notify) {
                this.trxDataService = trxDataService;
                this.listOptionsDataSvc = listOptionsDataSvc;
                this.notify = notify;
                this.listSvc = listOptionsDataSvc;
                this.gettransactiontypes();
                this.gettransactionvalues();
                if (this.liststate.transactionToEdit == undefined) {
                    this.trans = this.trxDataService.newBlankTrans();
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
                this.trans = this.trxDataService.newBlankTrans();
            };
            transactionEditorController.prototype.cancel = function () {
                this.liststate.addMode = false;
            };
            transactionEditorController.prototype.submit = function () {
                var _this = this;
                if (this.newrecord) {
                    this.trxDataService.post(this.trans)
                        .then(function (t) {
                        _this.notify({ message: 'Item created successfully: ', classes: 'alert-success' });
                        _this.liststate.addMode = false;
                    })
                        .catch(function (e) {
                        _this.notify({ message: 'There was a problem submitting this item: ' + e, classes: 'alert-danger' });
                    });
                }
                else {
                    this.trxDataService.put(this.trans)
                        .then(function (t) {
                        _this.notify({ message: 'Item updated successfully: ', classes: 'alert-success' });
                        _this.liststate.addMode = false;
                    })
                        .catch(function (e) {
                        _this.notify({ message: 'There was a problem updating this item: ' + e, classes: 'alert-danger' });
                    });
                }
            };
            transactionEditorController.$inject = ['trxDataService', 'listOptionsDataSvc', 'notify'];
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
                controller: transactionValueEditorCtrl,
                templateUrl: 'Views/Templates/TransactionValueEditor.html'
            };
        }
        Directives.transactionValueEditor = transactionValueEditor;
        var transactionValueEditorCtrl = (function () {
            function transactionValueEditorCtrl(trxdetailDataService, notify, $rootscope, listOptionsDataSvc) {
                this.trxdetailDataService = trxdetailDataService;
                this.notify = notify;
                this.$rootscope = $rootscope;
                this.listOptionsDataSvc = listOptionsDataSvc;
                // If there's already a transactionvalue to edit then load it - otherwise give us a new one. 
                if (this.listState.tvToEdit != undefined) {
                    this.tv = this.listState.tvToEdit;
                    this.newitem = false;
                }
                else {
                    this.tv = this.trxdetailDataService.getnewTransactionValue(this.listState.tID);
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
                    this.trxdetailDataService.post(this.tv)
                        .success(function (d) {
                        _this.notify({ message: 'Item created successfully', classes: 'alert-success' });
                        _this.clearandClose();
                    })
                        .error(function (e) {
                        _this.notify({ message: 'There was a problem submitting the item: ' + e.message, classes: 'alert-danger' });
                    });
                }
                else {
                    this.trxdetailDataService.put(this.tv)
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
                this.trxdetailDataService.delete(this.tv.ID)
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
    })(Directives = Budgeter.Directives || (Budgeter.Directives = {}));
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
        .service('trxdetailDataService', Budgeter.Services.trxdetailDataSvc)
        .service('listOptionsDataSvc', Budgeter.Services.listOptionsDataSvc)
        .service('trxList', Budgeter.Services.TrxList)
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
