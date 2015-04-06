App.module('MP', function (MP) {
    MP.MPView = Marionette.Layout.extend({
        className: 'mp',
        template: '#mp',
        emptyTemplate: '#mp-404',
        regions: {
            interests: "#mp-interests"
        },
        onShow: function () {
            this.interests.show(new App.MP.BarChartView({
                'average': 68668,
                'value': this.model.get('financial_interests')
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