App.module('Parties', function (Parties) {
    Parties.Controller = Marionette.Controller.extend({
        // When the module stops, we need to clean up our views
        hide: function () {
            App.body.close();
            this.data = this.view = null;
        },
        showParties: function () {

            this._ensureSubAppIsRunning();
            this.data = App.module('Data').parties

            // Get layout view
            this.view = new Parties.PartiesView({
                model: this.data
            });

            // Show in the body
            App.body.show(this.view);
        },
        // Makes sure that this subapp is running so that we can
        // perform everything we need to
        _ensureSubAppIsRunning: function () {
            App.execute('subapp:start', 'Parties');
        }
    });
});