app.directive('productOverview', function (ClothingFactory, $stateParams, $state) {

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
                ClothingFactory.getProducts()
                    .then(function(products) {
                        scope.products = products;
                    });
            }
            
            if ($stateParams.search) {

                if (ClothingFactory.getSearchResults().length === 0) {
                    scope.results = "no results";

                    
                } else {

                    scope.products = ClothingFactory.getSearchResults();
                }
            }


            scope.selectCategory = function() {
                var selectedCategoryType = this.category.label;
                
                ClothingFactory.getProducts(selectedCategoryType).then(function(products) {
                    scope.products = products;
                    scope.results = null;
                    $state.go($state.$current,{}, {inherit: false})
                });
            };

            /*scope.displaySearch = function($searchTerm) {
                var selectedCategoryType = this.category.label;

                ClothingFactory.getProducts(selectedCategoryType).then(function(products) {
                    scope.products = products;
                });
            };*/


        }//end link

    };

});
