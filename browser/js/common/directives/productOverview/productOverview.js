app.directive('productOverview', function (clothing, $stateParams) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/productOverview/productOverview.html',
        link: function (scope) {

            scope.categories = [
                { label: 'Tops'},
                { label: 'Bottoms'}
            ];

            
            if (!$stateParams.search) {
                clothing.getProducts()
                    .then(function(products) {
                        scope.products = products;
                    });
            }
            
            if ($stateParams.search) {

                if (clothing.getSearchResults().length === 0) {
                    scope.results = "no results";
                    
                } else {
                    console.log('search results', $stateParams.search);
                    scope.products = clothing.getSearchResults();
                }
            }

            
            scope.selectCategory = function() {
                var selectedCategoryType = this.category.label;

                clothing.getProducts(selectedCategoryType).then(function(products) {
                    scope.products = products;
                });
            };
            scope.displaySearch = function($searchTerm) {
                var selectedCategoryType = this.category.label;

                clothing.getProducts(selectedCategoryType).then(function(products) {
                    scope.products = products;
                });
            };


        }//end link

    };

});