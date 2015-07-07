///<reference path="../all.d.ts"/>
var utilities;
(function (utilities) {
    /** takes a date and a month number to offset */
    function lastDay(date, offset) {
        return new Date(date.getFullYear(), date.getMonth() + offset, 0);
    }
    utilities.lastDay = lastDay;
    ;
    function getUTCDate(indate) {
        var d = new Date();
        return indate.setDate(indate.getDate() + (d.getTimezoneOffset() * 60000));
        //return new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate()));
    }
    utilities.getUTCDate = getUTCDate;
    function stringifyDate(d) {
        return d.toLocaleDateString();
    }
    utilities.stringifyDate = stringifyDate;
})(utilities || (utilities = {}));
