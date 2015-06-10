app.directive('productOverview', function (clothing) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/productOverview/productOverview.html',
        link: function (scope) {

            scope.categories = [
                { label: 'Tops'},
                { label: 'Bottoms'}
            ];

            clothing.getProducts().then(function(products) {
                scope.products = products;
            });
            
            scope.selectCategory = function() {
                var selectedCategoryType = this.category.label;
                //console.log(this);

                clothing.getProducts(selectedCategoryType).then(function(products) {
                scope.products = products;
                });
            }



        }//end link

    };

});