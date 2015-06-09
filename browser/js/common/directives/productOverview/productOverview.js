app.directive('productOverview', function (clothing) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/productOverview/productOverview.html',
        link: function (scope) {

            scope.categories = [
                { label: 'Tops'},
                { label: 'Pants'}
            ];

            clothing.getProducts().then(function(products) {
                scope.products = products;
            });
            
            scope.selectCategory = function() {
                var categoryPicked = this.category.label;
                // scope.toDisplay = clothing.getProducts(categoryPicked);
                scope.toDisplay = clothing.products;
            }



        }//end link

    };

});