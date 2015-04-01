// Filename: router.js
define(function (require, exports, module) {
    "use strict";

    var tpl = require('text!./template.html');
    var Backgrid = require("backgrid");
    var Backbone = require("backbone");
    var MPCollection = require("../collection")

    var linkCell = Backgrid.UriCell.extend({
        render: function () {
            this.$el.empty();
            var rawValue = this.model.get(this.column.get("name"));
            var formattedValue = this.model.get(this.titleField)
            this.$el.append($("<a>", {
              tabIndex: -1,
              href: '#mp/' + rawValue,
              title: 'View' + formattedValue
            }).text('View'));
            this.delegateEvents();
            return this;
          }
    });

    // Column definitions
    var columns = [
        {
            name: "id",
            label: "Link",
            cell: linkCell.extend({titleField:'name'}),
            editable: false
        },
        {
            name: "list_name",
            label: "MP",
            cell: "string",
            editable: false
        },
        {
            name: "constituency",
            label: "Constituency",
            cell: "string",
            editable: false
        },
        {
            name: "party",
            label: "Party",
            cell: "string",
            editable: false
        }
    ];

    var View = Backbone.View.extend({
        el: $("#main"),
        initialize: function () {
            this.collection = new MPCollection();
            this.collection.fetch({reset: true});
            this.grid = new Backgrid.Grid({
              columns: columns,
              collection: this.collection
            });
        },
        render: function () {
            // Make mp page item active
            $('#navbar li').removeClass('active');
            $('#navbar li a[href="#mp"]').parent().addClass('active');
            // Render the template
            var template = _.template(tpl);
            this.$el.html(template());
            this.$('#grid').html(this.grid.render().el);
        }
    });

    module.exports = View

});
