///<reference path="../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Utilities;
    (function (Utilities) {
        /** takes a date and a month number to offset */
        function lastDay(date, offset) {
            return new Date(date.getFullYear(), (date.getMonth() + 1) + offset, 0);
        }
        Utilities.lastDay = lastDay;
        ;
        function getUTCDate(indate) {
            var p = new Date(indate);
            return new Date(p.getUTCFullYear(), p.getUTCMonth(), p.getUTCDate(), p.getUTCHours(), p.getUTCMinutes(), p.getUTCSeconds());
        }
        Utilities.getUTCDate = getUTCDate;
        function stringifyDate(d) {
            return d.toLocaleDateString();
        }
        Utilities.stringifyDate = stringifyDate;
    })(Utilities = Budgeter.Utilities || (Budgeter.Utilities = {}));
})(Budgeter || (Budgeter = {}));
