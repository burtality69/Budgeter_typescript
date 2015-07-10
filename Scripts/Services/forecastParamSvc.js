///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var forecastParamSvc = (function () {
            function forecastParamSvc() {
                var s = new Date();
                var e = Budgeter.Utilities.lastDay(s, 3);
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
                    return { startdate: Budgeter.Utilities.stringifyDate(this.startDate),
                        enddate: Budgeter.Utilities.stringifyDate(this.endDate),
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
