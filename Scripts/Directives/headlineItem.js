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
