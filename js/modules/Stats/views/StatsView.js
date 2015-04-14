App.module('Stats', function (Stats) {
    Stats.StatsView = Marionette.Layout.extend({
        className: 'stats',
        template: '#stats',
        regions: {
            total: "#stats-total",
            expenses: "#stats-expenses"
        },
        onShow: function () {
            this.total.show(new App.Stats.BarChartView({
                model: this.model
            }));
        },
        onRender: function () {
            // Make Stats page item active
            $('#navbar li').removeClass('active');
            $('#navbar li a[href="#stats"]').parent().addClass('active');
        }
    });
});