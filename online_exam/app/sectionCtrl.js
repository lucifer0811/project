app.controller('sectionCtrl', function($scope, $routeParams ,$filter, $modal, Data){
  $scope.id_exam = $routeParams.id;

  Data.get('examies/'+$routeParams.id+'/sections').then(function(data){
    $scope.sections = data;
  });

  $scope.open = function(p, size){
    var modalInstance = $modal.open({
      templateUrl: 'html/sections/sectionNew.html',
      controller: 'sectionNewCtrl',
      size: size,
      resolve: {
        item: function() {
          return p;
        }
      }
    });
    modalInstance.result.then(function(selectedObject){
      $scope.sections.push(selectedObject);
      $scope.sections = $filter('orderBy')($scope.sections, '-id', 'reverse');
    });
  };

  $scope.columns = [
    {text:"ID",predicate:"id", sortable: true},
    {text:"Number Question",predicate:"numberQuestion"},
    {text:"Time Limit",predicate:"time_limit",sortable:false}
  ];
});

app.controller('sectionNewCtrl', function($scope, $routeParams, $modalInstance, $http, Data){
  $scope.cancel = function() {
    $modalInstance.dismiss('Close');
  }
  $scope.title = 'New Section';
  $scope.buttonText = 'Add';
  $scope.addSection = function(section) {
    section.exam_id = $routeParams.id;
    Data.post('examies/'+$routeParams.id+'/sections', section).then(function (result) {
      if(result.status != 'error'){
          var x = angular.copy(section);
          x.save = 'insert';
          x.id = result.data;
          $modalInstance.close(x);
      }else{
        console.log(result);
      }
    });
  }
});
