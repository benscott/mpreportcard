App.module('Search', function (Search) {
    Search.SearchView = Marionette.ItemView.extend({
        template: _.template('<form role="search" id="search-form"> \
        <div class="input-group">\
        <input class="form-control" placeholder="MP name">\
        <div class="input-group-btn">\
            <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>\
        </div></div></form>'),

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
                preserveInput: true,
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
                    this.value = ''
                    Backbone.history.navigate('mp/' + suggestion.data, { trigger: true, replace: true});
                }

            })

        }
    });
});

// Add the search box to the search bar
App.addInitializer(function () {
    search = new App.Search.SearchView()
    App.search.show(search)
});