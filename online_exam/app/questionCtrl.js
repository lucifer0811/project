app.controller('questionCtrl', function ($scope, $modal, $filter, Data){
	$scope.question = {};
	  Data.get('questions').then(function(data){
      $scope.questions = data;
    });

    $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Content",predicate:"content",sortable:true},
                    
                   
                ];
})
