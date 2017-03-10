app.controller('examCtrl', function($scope, $filter, $modal, Data){
  Data.get('examies').then(function(data){
    $scope.examies = data;
  });
  $scope.open = function(p, size){
    var modalInstance = $modal.open({
      templateUrl: 'html/examies/examNew.html',
      controller: 'examNewCtrl',
      size: size,
      resolve: {
        item: function() {
          return p;
        }
      }
    });
    modalInstance.result.then(function(selectedObject){
      $scope.examies.push(selectedObject);
      $scope.examies = $filter('orderBy')($scope.examies, 'id', 'reverse');
    });
  };

  $scope.columns = [
      {text:"Name",predicate:"name",sortable:true},
      {text:"Time Start",predicate:"open_time",sortable:true},
      {text:"Time Finish",predicate:"close_time",sortable:false},
      {text:"Action"}
    ];
});

app.controller('examNewCtrl', function($scope, $modalInstance, $http, Data){
  $scope.cancel = function() {
    $modalInstance.dismiss('Close');
  }
  $scope.title = 'New Exam';
  $scope.buttonText = 'Add Exam';
  $scope.addExam = function(exam) {
    Data.post('examies', exam).then(function (result) {
      if(result.status != 'error'){
          var x = angular.copy(exam);
          x.save = 'insert';
          x.id = result.data;
          $modalInstance.close(x);
      }else{
        console.log(result);
      }
    });
  }
});
