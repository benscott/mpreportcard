// Filename: router.js
define(function (require, exports, module) {
    "use strict";

    var tpl = require('text!./template.html');
    var Backgrid = require("backgrid");
    var Backbone = require("backbone");
    var IssueCollection = require("../collection")

    var linkCell = Backgrid.UriCell.extend({
        render: function () {
            this.$el.empty();
            var rawValue = this.model.get(this.column.get("name"));
            var formattedValue = this.model.get(this.titleField)
            this.$el.append($("<a>", {
              tabIndex: -1,
              href: rawValue,
              title: this.title || formattedValue,
              target: this.target
            }).text(formattedValue));
            this.delegateEvents();
            return this;
          }
    });

    // Column definitions
    var columns = [
        {
            name: "html_url",
            label: "Issue",
            cell: linkCell.extend({titleField:'title'}),
            editable: false
        },
        {
            name: "created_at",
            label: "Date created",
            cell: "date",
            editable: false
        }
    ];

    var View = Backbone.View.extend({
        el: $("#main"),
        initialize: function (milestone_id) {
            this.collection = new IssueCollection({milestone_id: milestone_id});
            // Fetch the milestones - this performs an API call
            this.collection.fetch({reset: true});
            this.collection.bind('reset', this.render, this);

            this.grid = new Backgrid.Grid({
              columns: columns,
              collection: this.collection
            });
        },
        render: function () {
            // Render the template
            var template = _.template(tpl);
            this.$el.html(template());
            // And add the grid
            this.$('#grid').html(this.grid.render().el);

        }
    });

    module.exports = View

});
