app.controller('sectionCtrl', ['$scope', '$rootScope', '$stateParams', '$filter', '$uibModal', 'Data',
  function($scope, $rootScope, $stateParams ,$filter, $uibModal, Data){
  $scope.id_exam = $stateParams.id;
  $scope.section = {};

  Data.get('examies/'+$stateParams.id+'/sections').then(function(data){
    $scope.sections = data;
  });

  $scope.showAllQuestion = function(p, q, size){
    $rootScope.id_section = q.id;
    var modalInstance = $uibModal.open({
      templateUrl: 'templates/section_questions/questions.html',
      controller: 'section_questionCtrl',
      size: size,
      resolve: {
        item: function(){
          return p;
        }
      }
    });
  };

  $scope.addRandomQuestion = function(p, q, size){
    $rootScope.id_section = q.id;
    var modalInstance = $uibModal.open({
      templateUrl: 'templates/section_questions/question_random.html',
      controller: 'section_questionCtrl',
      size: size,
      resolve: {
        item: function(){
          return p;
        }
      }
    });
  };

  $scope.open = function(p, size){
    var modalInstance = $uibModal.open({
      templateUrl: 'templates/sections/sectionNew.html',
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

  $scope.deleteSection = function(section){
    if(confirm("Are you sure to remove the section")){
      Data.delete('examies/'+$stateParams.id+'/sections/'+section.id).then(function(result){
        $scope.sections = _.without($scope.sections, _.findWhere($scope.sections, {id:section.id}));
      });
    }
  };

  $scope.columns = [
    {text:"ID",predicate:"id", sortable: true},
    {text:"Number Question",predicate:"numberQuestion"},
    {text:"Time Limit",predicate:"time_limit",sortable:false}
  ];
}]);

app.controller('sectionNewCtrl', ['$scope', '$stateParams', '$uibModalInstance', '$http', 'Data',
  function($scope, $stateParams, $uibModalInstance, $http, Data){
  $scope.cancel = function() {
    $uibModalInstance.dismiss('Close');
  }
  $scope.title = 'New Section';
  $scope.buttonText = 'Add';
  $scope.addSection = function(section) {
    section.exam_id = $stateParams.id;
    Data.post('examies/'+$stateParams.id+'/sections', section).then(function (result) {
      if(result.status != 'error'){
          var x = angular.copy(section);
          x.save = 'insert';
          x.id = result.data;
          $uibModalInstance.close(x);
      }else{
        console.log(result);
      }
    });
  }
}]);
