// Filename: router.js
define(function (require, exports, module) {
    "use strict";

    var app = require("app");
    var Backbone = require("backbone");

    var MPListView = require('components/mp/list/view');
    var MPView = require('components/mp/view/view');

    // Basic pages
    var HomePageView = require('components/page/home/view');

    var Router = Backbone.Router.extend({
        routes: {
            // Define URL routes
            '': 'home',
            'mp': 'mp_list',
            'mp/:mp_id': 'mp_view',
            // Default
            '*actions': 'home'
        },
        home: function () {
            var view = new HomePageView();
            view.render();
        },
        mp_list: function () {
            var view = new MPListView();
            view.render();
        },
        mp_view: function (mp_id) {
            var view = new MPView(mp_id);
            view.render();
        }

    });

    module.exports = Router;

});