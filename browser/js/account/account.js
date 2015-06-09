app.config(function ($stateProvider) {

    $stateProvider.state('account', {
        url: '/my-account',
        controller: 'AccountController',
        templateUrl: 'js/account/account.html',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});

app.controller('AccountController', function ($scope) {

});