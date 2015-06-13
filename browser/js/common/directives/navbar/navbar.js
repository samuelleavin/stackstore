app.directive('navbar', function ($rootScope, AuthService, clothing, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.submitSearch = function(searchTerm) {
               clothing.searchProducts(searchTerm).then(function(results) {
                    $state.go('clothing', { search: searchTerm});
               }, function(err) {
                    console.log(err);
               });


            };

            scope.items = [
                { label: 'My Account', state: 'account', auth: true },
                { label: 'Cart', state: 'cart' }
            ];

            scope.dropdownCategories = [
                { label: 'Tops', state: 'tops' },
                { label: 'Bottoms', state: 'bottoms' }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});