App.module('Parties', function (Parties) {
    // Module Must be Manually Started
    Parties.startWithParent = false;
    Parties.controller = new Parties.Controller();
    Parties.router = new Parties.Router({controller: Parties.controller});
    Parties.addFinalizer(function () {
        Parties.controller.hide();
        Parties.stopListening();
    });
});