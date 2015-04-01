define(function(require, exports, module) {
  "use strict";

  var app = require("app");
  var MP = require("./model");

  var Collection = Backbone.Collection.extend({
    url: 'src/mps.json',
    model: MP
  });

  module.exports = Collection;

});