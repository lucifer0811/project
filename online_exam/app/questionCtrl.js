app.controller('questionCtrl', function ($scope, $modal, $filter, Data){
	$scope.question = {};
	  Data.get('questions').then(function(data){
      $scope.questions = data;
    });
    Data.get('answers').then(function(data){
      $scope.answers = data;
   });

  $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Content",predicate:"content",sortable:true},
                    {text:"Number answer",predicate:"number_answer",sortable:true},
                    {text:"Number question true",predicate:"number_question_true",sortable:true},

                ];
})
