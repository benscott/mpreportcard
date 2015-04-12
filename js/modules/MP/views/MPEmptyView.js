App.module('MP', function (MP) {
    MP.EmptyView = Marionette.ItemView.extend({
        // Special view for rendering text for zero values
        // For example, ministers don't submit written questions
        template: _.template('<p><%= reason %></p>'),
        templateHelpers: function () {
            return {
              reason: this.options.reason
            };
          }
     });
});