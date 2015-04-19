App.Router = Marionette.AppRouter.extend({
    routes: {
        "notFound": "redirectNotFound"
    },
    redirectNotFound: function () {
        Backbone.history.navigate('', { trigger: true, replace: true});
    },
    onRoute: function(){
        console.log('toute');
    }


});

App.addInitializer(function () {
    App.router = new App.Router();
});