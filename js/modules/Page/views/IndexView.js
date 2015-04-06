App.module('Page', function (Page) {
    Page.IndexView = Marionette.Layout.extend({
        className: 'home',
        template: '#index-page',
        regions: {
            search: "#home-search"
        },
        onShow: function () {
            this.search.show(new App.Search.SearchView({placeholder: 'Enter MP\'s name, constituency or postcode'}))
        },
        onRender: function () {
            // Make mp page item active
            $('#navbar li').removeClass('active');
            $('#navbar li a[href="#"]').parent().addClass('active');
        }
    });
});