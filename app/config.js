require.config({

  paths: {
    jquery: '/vendor/bower/jquery/dist/jquery',
    autocomplete: '/vendor/bower/devbridge-autocomplete/dist/jquery.autocomplete',
    backbone: '/vendor/bower/backbone/backbone',
    underscore: '/vendor/bower/underscore/underscore',
    text: '/vendor/bower/text/text',
    backgrid: '/vendor/bower/backgrid/lib/backgrid',
    templates: 'templates',
    bootstrap: "/vendor/bower/bootstrap/dist/js/bootstrap"
  },
    shim: {
        'bootstrap': ['jquery']
    }

});