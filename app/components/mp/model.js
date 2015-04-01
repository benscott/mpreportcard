define(function (require, exports, module) {
    "use strict";

    var app = require("app");

    var MP = Backbone.Model.extend({
        initialize: function () {
            this.set({ cls: this.get("party").toLowerCase().replace(' ', '-') });
        }
    });
    module.exports = MP;

});
