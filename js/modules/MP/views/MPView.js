App.module('MP', function (MP) {
    MP.MPView = Marionette.ItemView.extend({
        template: '#mp',
        emptyTemplate: '#mp-404',
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