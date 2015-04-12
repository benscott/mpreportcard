App.module('Data', function (Data) {
    Data.addInitializer(function (options) {
        // Data is passed in from the initialisation function
        Data.mps = new Data.MPs((options && options.data && options.data.mps) || []);
        // We don't need a model for the totals or stats
        Data.averages = (options && options.data && options.data.averages) || [];
        Data.stats = (options && options.data && options.data.stats) || [];
    });
    Data.addFinalizer(function () {
        // Delete the data
        delete Data.mps;
        delete Data.averages;
        delete Data.stats;
    });
});