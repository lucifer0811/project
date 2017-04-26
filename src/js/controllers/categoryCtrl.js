app.controller('categoryCtrl',['$scope', '$uibModal', '$filter', 'Data', function ($scope, $uibModal, $filter, Data) {
  $scope.category = {};

  Data.get('categories').then(function(data){
      $scope.categories = data;
  });

  $scope.edit = function (p,size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'templates/categories/categoryEdit.html',
      controller: 'categoryEditCtrl',
      size: size,
      resolve: {
        item: function () {
          return p;
        }
      }
    });
    modalInstance.result.then(function(selectedObject) {
      p.name = selectedObject.name;
      p.descriptions = selectedObject.descriptions;
    });
  };

  $scope.open = function(p, size){
    var modalInstance = $uibModal.open({
      templateUrl: 'templates/categories/categoryNew.html',
      controller: 'categoryNewCtrl',
      size: size,
      resolve: {
        item: function() {
          return p;
        }
      }
    });
    modalInstance.result.then(function(selectedObject){
      $scope.categories.push(selectedObject);
      $scope.categories = $filter('orderBy')($scope.categories, 'id', 'reverse');
    });
  };

  $scope.deleteCategory = function(category){
    if(confirm("Are you sure!!!!")){
      Data.delete('categories/'+category.id).then(function(result){
        $scope.categories = _.without($scope.categories, _.findWhere($scope.categories, {id:category.id}));
      });
    }
  };

  $scope.columns = [
    {text:"Name",predicate:"name",sortable:true},
    {text:"Descriptions",predicate:"descriptions",sortable:true},
    {text:"Action",predicate:"",sortable:false},
  ];
}]);

app.controller('categoryEditCtrl', ['$scope', '$uibModalInstance', 'item', 'Data', function ($scope, $uibModalInstance, item, Data){
  $scope.category = angular.copy(item);
  $scope.cancel = function() {
    $uibModalInstance.dismiss('Close');
  }

  $scope.title = 'Edit Category';
  $scope.buttonText = 'Update Category';
  var original = item;
  $scope.isClean = function(){
    return angular.equals(original, $scope.category);
  }

  $scope.saveCategory = function(category) {
    Data.put('categories/'+category.id, $scope.category).then(function (result){
      if (result.status != 'error'){
        var x = angular.copy(category);
        x.save = 'update';
        $uibModalInstance.close(x);
      }else{
        console.log(result);
      }
    });
  }
}]);

app.controller('categoryNewCtrl', ['$scope', '$uibModalInstance', '$http', 'Data', function($scope, $uibModalInstance, $http, Data){
  $scope.cancel = function() {
    $uibModalInstance.dismiss('Close');
  }
  $scope.title = 'New Category';
  $scope.buttonText = 'Add Category';
  $scope.addNewCategory = function(category) {
    Data.post('categories', category).then(function (result) {
      if(result.status != 'error'){
          var x = angular.copy(category);
          x.save = 'insert';
          x.id = result.data;
          $uibModalInstance.close(x);
      }else{
        console.log(result);
      }
    });
  }
}]);
