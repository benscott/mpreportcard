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
                serviceUrl: function(q){
                    // Redirect to postcode if string contains number
                    if(q.match(/\d+/g) != null){
                        return "http://127.0.0.1:8931/postcode.js"
                    }else{
                        return "http://127.0.0.1:8931/mp.js"
                    }
                },
                dataType: "jsonp",
                paramName: 'q',
                ajaxSettings: {
                    jsonp: 'json.wrf'
                },
                minChars: 2,
                preserveInput: true,
                showNoSuggestionNotice: true,
                noSuggestionNotice: 'Sorry, we could find an MP matching your search.',
                onSearchStart: function (query) {
                    if(query.q.match(/\d+/g) != null){
                        // Postcode only search
                        query.q = 'postcode:' + query.q
                    }else{
                        // Handles spaces
                        query.q = '(' + query.q.replace(' ', '') + ')'
                    }

                },
                transformResult: function(response) {

                    // Format the data we've received from SOLR
                    return {
                        suggestions: $.map(response.response.docs, function(item) {
                            return { value: item.name + ' (' + item.constituency +')', data: item.id };
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