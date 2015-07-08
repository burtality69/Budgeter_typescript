///<reference path="../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Utilities;
    (function (Utilities) {
        /** takes a date and a month number to offset */
        function lastDay(date, offset) {
            return new Date(date.getFullYear(), date.getMonth() + offset, 0);
        }
        Utilities.lastDay = lastDay;
        ;
        function getUTCDate(indate) {
            var d = new Date();
            return indate.setDate(indate.getDate() + (d.getTimezoneOffset() * 60000));
            //return new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate()));
        }
        Utilities.getUTCDate = getUTCDate;
        function stringifyDate(d) {
            return d.toLocaleDateString();
        }
        Utilities.stringifyDate = stringifyDate;
    })(Utilities = Budgeter.Utilities || (Budgeter.Utilities = {}));
})(Budgeter || (Budgeter = {}));
