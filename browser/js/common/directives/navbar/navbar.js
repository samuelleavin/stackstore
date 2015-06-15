app.directive('navbar', function ($rootScope, AuthService, ClothingFactory, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.submitSearch = function(searchTerm) {
               ClothingFactory.searchProducts(searchTerm).then(function(results) {
                    var tmp = scope.searchTerm + '';
                    scope.searchTerm = null;
                    $state.go('clothing', { search: tmp});
               }, function(err) {
                    console.log(err);
               });
            };

            scope.showAll = function () {
                if ($state.$current.name !== 'clothing') {
                    $state.go('clothing');
                } else {
                    $state.go('clothing', {}, {reload: true, inherit: false})
                }
            }

            scope.items = [
                { label: 'My Account', state: 'account', auth: true }
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