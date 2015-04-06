App.module('Search', function (Search) {
    Search.SearchView = Marionette.ItemView.extend({
        template: _.template('<form role="search" id="search-form">\
        <input class="form-control" placeholder="<%= placeholder %>">\
        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>\
        </form>'),
        templateHelpers: function () {
            return {
              placeholder: this.options.placeholder
            };
          },
        onRender: function(){
            this.$('input').autocomplete({
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
                minChars: 2,
                preserveInput: true,
                showNoSuggestionNotice: true,
                noSuggestionNotice: 'Sorry, we could find an MP matching your search.',
                onSearchStart: function (query) {
                    // Add wildcard to search
                    query['q'] += '*'
                },
                transformResult: function(response) {

                    // Format the data we've received from SOLR
                    return {
                        suggestions: $.map(response.response.docs, function(item) {
                            // FIXME: Add constituency to search
                            return { value: item.name, data: item.id };
                        })
                    };
                },
                onSelect: function (suggestion) {
                    this.value = ''
                    Backbone.history.navigate('mp/' + suggestion.data, { trigger: true, replace: true});
                }

            })

        }
    });
});

// Add the search box to the search bar
App.addInitializer(function () {
    search = new App.Search.SearchView({placeholder: 'Find an MP'})
    App.search.show(search)
});