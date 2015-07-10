///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
        var forecastParams = (function () {
            function forecastParams() {
                var s = new Date();
                var e = Budgeter.Utilities.lastDay(s, 3);
                this._params = { startdate: s, enddate: e, startbal: 0 };
            }
            Object.defineProperty(forecastParams.prototype, "params", {
                get: function () {
                    return this._params;
                },
                set: function (p) {
                    this._params = p;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(forecastParams.prototype, "startbal", {
                get: function () {
                    return this._params.startbal;
                },
                set: function (n) {
                    this._params.startbal = n;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(forecastParams.prototype, "startDate", {
                get: function () {
                    return this._params.startdate;
                },
                set: function (d) {
                    this._params.enddate = d;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(forecastParams.prototype, "endDate", {
                get: function () {
                    return this._params.enddate;
                },
                set: function (d) {
                    this._params.enddate = d;
                },
                enumerable: true,
                configurable: true
            });
            return forecastParams;
        })();
        Services.forecastParams = forecastParams;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
