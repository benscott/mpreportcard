App.module('Stats', function (Stats) {
    Stats.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "showStats"
        }
    });
});