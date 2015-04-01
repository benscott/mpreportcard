// Filename: router.js
define(function (require, exports, module) {
    "use strict";

    var tpl = require('text!./template.html');
    var Backgrid = require("backgrid");
    var Backbone = require("backbone");
    var MPCollection = require("../collection")


    var View = Backbone.View.extend({
        el: $("#main"),
        initialize: function (mp_id) {
            this.mp_id = mp_id;
            this.mps = new MPCollection();
            this.mps.fetch({reset: true});
            this.mps.bind('reset', this.show, this);
        },
        render: function(){
            // Make mp page item active
            $('#navbar li').removeClass('active');
            $('#navbar li a[href="#mp"]').parent().addClass('active');
        },
        show: function () {
            var mp = this.mps.get(this.mp_id);
            var template = _.template(tpl);
            this.$el.html(template({mp: mp}));
        }
    });

    module.exports = View

});
