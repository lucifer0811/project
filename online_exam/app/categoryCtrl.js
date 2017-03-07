app.controller('categoryCtrl', function ($scope, $modal, $filter, Data) {
    $scope.categories = {};

    Data.get('categories').then(function(data){
        $scope.categories = data;
    });

    $scope.edit = function (p,size) {
      var modalInstance = $modal.open({
        templateUrl: 'html/categories/categoryEdit.html',
        controller: 'categoryEditCtrl',
        size: size,
        resolve: {
          item: function () {
            return p;
          }
        }
      });
      modalInstance.result.then(function(selectedObject) {
        if(selectedObject.save == "insert"){
          $scope.cayegories.push(selectedObject);
          $scope.categories = $filter('orderBy')($scope.categories, 'id', 'reverse');
        }else if(selectedObject.save == "update"){
          p.name = selectedObject.name;
          p.descriptions = selectedObject.descriptions;
        }
      });
    };

    $scope.columns = [
      {text:"ID",predicate:"id",sortable:true,dataType:"number"},
      {text:"Name",predicate:"name",sortable:true},
      {text:"Descriptions",predicate:"descriptions",sortable:true},
      {text:"Action",predicate:"",sortable:false},
    ];
});

app.controller('categoryEditCtrl', function ($scope, $modalInstance, item, Data){
  $scope.category = angular.copy(item);

  $scope.cancel = function() {
    $modalInstance.dismiss('Close');
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
        $modalInstance.close(x);
      }else{
        console.log(result);
      }
    });
  }
});
