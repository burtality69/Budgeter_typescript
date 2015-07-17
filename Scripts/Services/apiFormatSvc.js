///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Services;
    (function (Services) {
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
                    Start_date: Budgeter.Utilities.stringifyDate(t.Start_date),
                    End_date: Budgeter.Utilities.stringifyDate(t.End_date)
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
                    Start_date: Budgeter.Utilities.getUTCDate(t.Start_date),
                    End_date: Budgeter.Utilities.getUTCDate(t.End_date)
                };
            };
            return apiFormatSvc;
        })();
        Services.apiFormatSvc = apiFormatSvc;
    })(Services = Budgeter.Services || (Budgeter.Services = {}));
})(Budgeter || (Budgeter = {}));
