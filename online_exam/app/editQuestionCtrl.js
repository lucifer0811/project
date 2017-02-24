app.controller('editQuestionCtrl', function ($scope,$modal, $filter, Data,item,$modalInstance){
      Data.get('categories').then(function(data){
       $scope.categories = data;
       console.log($scope.categories);
      });
    $scope.question = angular.copy(item);  
    if($scope.question == null){
      $scope.question = {};
      $scope.question.answers = [];
      var choice1={};
      var choice2={};
      var choice3={};
      var choice4={};
      $scope.question.answers.push(choice1);
      $scope.question.answers.push(choice2);
      $scope.question.answers.push(choice3);
      $scope.question.answers.push(choice4);
    }else{
      $scope.question.answers =  JSON.parse($scope.question.answers);
    } 
    $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
    $scope.saveQuestion = function () {
            if ($scope.question.id != null){
                Data.put('editQuestions', $scope.question).then(function (result) {
                console.log(result);
                });
            }else{
                Data.post('addQuestions', $scope.question).then(function (result) {
                console.log(result);
                });
            }
          
            
    };
                
});  
