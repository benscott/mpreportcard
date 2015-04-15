var type = 'interests'

var colors = {
    'Labour': '#E00600',
    'Conservative': '#0061C8',
    'Liberal Democrat': '#FEB000',
    'UKIP': '#5B0066',
    'SDLP': '#0C5C40',
    'Green': '#78b82a',
    'DUP': '#CA5438',
    'Alliance': '#EFCE00',
    'Plaid Cymru': '#31751A',
    'Scottish National': '#FFF771',
    'Sinn Fein': '#087E30',
    'Independent': '#888888',
    'Respect': '#366C15'
}

App.module('Stats', function (Stats) {
    Stats.StatsView = Marionette.Layout.extend({
        className: 'stats',
        template: '#stats',
        regions: {
            total: "#stats-total",
            dataset: "#stats-dataset"
        },
        onRender: function () {
            // Make Stats page item active
            $('#navbar li').removeClass('active');
            $('#navbar li a[href="#stats"]').parent().addClass('active');
        }
    });
});