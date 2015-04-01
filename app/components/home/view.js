// Filename: router.js
define(function (require, exports, module) {
    "use strict";

    var Backbone = require("backbone");
    var autocomplete = require("autocomplete");
    var tpl = require('text!./template.html');
    var searchView = require('components/search/view');

    var View = Backbone.View.extend({
        el: $("#main"),
        initialize : function(){
          this.search = new searchView({});
        },
        render: function () {

            // Make home page item active
            $('#navbar li').removeClass('active');
            $('#navbar li a[href="#"]').parent().addClass('active');
            var template = _.template(tpl);
            this.$el.html(template());

            this.search.setElement(this.$('#search')).render()

//            this.$('#search').html(this.search.render());

        }
    });
    module.exports = View
});
