define(function(require, exports, module) {
  "use strict";

  var $ = require("jquery");
  var Backbone = require("backbone");

  // Alias the module for easier identification.
  var app = module.exports;

  // The root path to run the application through.
  app.root = "/";

  // API endpoint.
  app.api = "https://api.github.com/repos/NaturalHistoryMuseum/data-portal-roadmap.io/";

});