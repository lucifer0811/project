app.controller('questionCtrl', function ($scope,$modal, $filter, Data){
	  Data.get('questions').then(function(data){
      $scope.questions = data;
    });

    $scope.columns = [
      {text:"ID",predicate:"id",sortable:true,dataType:"number"},
      {text:"Content",predicate:"content",sortable:true},
      {text:"Edit",predicate:"content",sortable:true},
    ];
    $scope.open = function (question) {
        var modalInstance = $modal.open({
          templateUrl: 'html/questions/add_question.html',
          controller: 'editQuestionCtrl',
          resolve: {
            item: function () {
              return question;
            }
          }
        })
    };  
    $scope.datail = function (question) {
        console.log(question);
    };             
})
