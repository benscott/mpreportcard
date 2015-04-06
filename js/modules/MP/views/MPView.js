App.module('MP', function (MP) {
    MP.MPView = Marionette.Layout.extend({
        className: 'mp',
        template: '#mp',
        emptyTemplate: '#mp-404',
        regions: {
            interests: "#mp-interests",
            expenses: "#mp-expenses"
        },
        onShow: function () {
            this.interests.show(new App.MP.BarChartView({
                'average': App.module('Data').totals['interests_average'],
                'value': this.model.get('total_interests')
            }))
            this.expenses.show(new App.MP.BarChartView({
                'average': App.module('Data').totals['expenses_average'],
                'value': this.model.get('total_expenses')
            }))
        },
        getTemplate: function () {
            if (this.model) {
                return this.template;
            }
            else {
                return this.emptyTemplate;
            }
        },
        onRender: function () {
            // Make mp page item active
            $('#navbar li').removeClass('active');
            $('#navbar li a[href="#mp"]').parent().addClass('active');
        }
     });
});