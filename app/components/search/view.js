// Filename: router.js
define(function (require, exports, module) {
    "use strict";

    var Backbone = require("backbone");
    var autocomplete = require("autocomplete");
    var tpl = require('text!./template.html');

    var View = Backbone.View.extend({
        // el: We do not set element, this will always be embedded as a subview
        render: function () {

            console.log(this.$el)

            var template = _.template(tpl);
            this.$el.html(template());

            this.$('#mp-search').autocomplete({
                serviceUrl: "http://127.0.0.1:18080/solr/collection1/select",
                dataType: "jsonp",
                params: {
                    wt: 'json',
                    omitHeader: true
                },
                paramName: 'q',
                ajaxSettings: {
                    jsonp: 'json.wrf'
                },
                showNoSuggestionNotice: true,
                noSuggestionNotice: 'Sorry, no MP matching your requirements could be found.',
                onSearchStart: function (query) {
                    // Add wildcard to search
                    query['q'] += '*'
                },
                transformResult: function(response) {

                    // Format the data we've received from SOLR
                    return {
                        suggestions: $.map(response.response.docs, function(item) {
                            return { value: item.name, data: item.id };
                        })
                    };
                },
                onSelect: function (suggestion) {
                    console.log(suggestion);
                }

            })
        }
    });

    module.exports = View

});
