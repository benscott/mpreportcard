App.module('Stats', function (Stats) {
    Stats.StatsView = Marionette.Layout.extend({
        className: 'stats',
        template: '#stats',
        regions: {
            interests: "#stats-interests"
        },
        onShow: function () {
            this.interests.show(new App.Stats.BarChartView({
                data: this.options.data['financial_interests']
            }));
//            this.expenses.show(new App.Stats.BarChartView({
//                data: this.options.data['expenses']
//            }));
//            this.debates.show(new App.Stats.BarChartView({
//                data: this.options.data['debates']
//            }));
        }
//        onRender: function () {
//            // Make Stats page item active
//            $('#navbar li').removeClass('active');
//            $('#navbar li a[href="#stats"]').parent().addClass('active');
//        }
    });
});