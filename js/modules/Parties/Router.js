App.module('Parties', function (Parties) {
    Parties.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "parties": "showParties"
        }
    });
});