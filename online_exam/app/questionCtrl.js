app.controller('questionCtrl', function ($scope, $modal, $filter, Data){
	$scope.question = {};
	  Data.get('questions').then(function(data){
      $scope.questions = data;
    });
    Data.get('answers').then(function(data){
      $scope.answers = data;
   });
})
