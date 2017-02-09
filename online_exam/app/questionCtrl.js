app.controller('questionCtrl', function ($scope, $modal, $filter, Data){
	$scope.questions = {};
	 Data.get('questions').then(function(data){
        $scope.questions = data;
    });
})
