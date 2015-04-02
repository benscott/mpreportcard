App.module('Data', function (Data) {
    Data.addInitializer(function (options) {
    // Data is passed in from the initialisation function
        Data.mps = new Data.MPs((options && options.data && options.data.mps) || []);
    });
    Data.addFinalizer(function () {
        // Delete the data
        delete Data.mps;
    });
});