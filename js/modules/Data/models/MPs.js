App.module('Data', function (Data) {
    Data.MPs = Backbone.Collection.extend({
        model: Data.MP
    });
});