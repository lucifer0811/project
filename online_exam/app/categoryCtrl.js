app.controller('categoryCtrl', function ($scope, $modal, $filter, Data) {
    $scope.product = {};
    Data.get('categories').then(function(data){
        $scope.categories = data;
    });

    $scope.columns = [
                    {text:"Name",predicate:"name",sortable:true,dataType:"number"},
                    {text:"Descriptions",predicate:"Descriptions",sortable:true},
                ];
})

app.controller('editCategoryCtrl', function ($scope, $modalInstance, item, Data){
  $scope.category = angular.copy(item);

  $scope.cancel = function(){
    $modalInstance.dismiss('Close');
  };
  $scope.title = 'New Category';
  $scope.buttonText = "Add New Category"

  var original = item;
  $scope.isClean = function(){
    return angular.equals(original, $scope.category);
  }
  $scope.saveCategory = function(category) {
    category =
  }

})
