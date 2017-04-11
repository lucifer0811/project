app.controller('examCtrl', function($scope, $filter, $modal, Data){
  $scope.exam = {};
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

  $scope.deleteExam = function(exam){
    if(confirm("Are you sure!!!!")){
      Data.delete('examies/'+exam.id).then(function(result){
        $scope.examies = _.without($scope.examies, _.findWhere($scope.examies, {id:exam.id}));
      });
    }
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
app.controller('detailExamCtrl', function($scope, $routeParams ,$http, Data){
  $scope.id_exam = $routeParams.id;

  Data.get('examies/'+$routeParams.id).then(function(data){
    $scope.examies = data;
  });

  Data.get('examies/'+$routeParams.id+'/sections').then(function(data){
    angular.forEach(data, function(value, key) {
      Data.get('examies/'+ value.id +'/question').then(function(data){
        value.question = data;

      });
    })
    $scope.sections = data;
  });

  

});

