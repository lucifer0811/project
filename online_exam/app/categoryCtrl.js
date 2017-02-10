app.controller('categoryCtrl', function ($scope, $modal, $filter, Data) {
    $scope.product = {};
    Data.get('categories').then(function(data){
        $scope.categories = data;
    });
})
