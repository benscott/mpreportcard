define(function(require, exports, module) {
  "use strict";

  var app = require("app");

  var Collection = Backbone.Collection.extend({
    initialize: function (options) {
      this.milestone_id = options.milestone_id;
    },
    url: function() {

      console.log(app.api + "issues?milestone=" + this.milestone_id);
      return app.api + "issues?milestone=" + this.milestone_id;
    }
  });

  module.exports = Collection;

});
