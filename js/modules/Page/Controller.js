App.module('Page', function (Page) {
    Page.Controller = Marionette.Controller.extend({
        // When the module stops, we need to clean up our views
        hide: function () {
            App.body.close();
            this.view = null;
        },
        // Show list of MPs
        showIndex: function () {
            this._ensureSubAppIsRunning();
            this.view = new Page.IndexView();
            // Show in the body
            App.body.show(this.view);
        },
        // Makes sure that this subapp is running so that we can
        // perform everything we need to
        _ensureSubAppIsRunning: function () {
            App.execute('subapp:start', 'Page');
        }
    });
});