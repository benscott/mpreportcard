// Filename: router.js
define(function (require, exports, module) {
    "use strict";

    var app = require("app");
    var Backbone = require("backbone");
    var MilestoneListView = require('components/milestone/list/view');
    var IssueListView = require('components/issue/list/view');

    // Basic pages
    var HomePageView = require('components/page/home/view');

    var Router = Backbone.Router.extend({
        routes: {
            // Define URL routes
            '': 'home',
            'milestones/:milestone_id/issues': 'issues',
            // Default
            '*actions': 'milestones'
        },
        home: function () {
            var view = new HomePageView();
            view.render();
        },
        milestones: function () {
            var view = new MilestoneListView();
            view.render();
        },
        issues: function (milestone_id) {
            var view = new IssueListView(milestone_id);
            view.render();
        }

    });

    module.exports = Router;

});