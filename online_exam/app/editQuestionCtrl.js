app.controller('editQuestionCtrl', function ($scope, $modal, $filter, Data, item, $modalInstance) {
    Data.get('categories').then(function (data) {
        $scope.categories = data;
    });
    $scope.question = angular.copy(item);
    if ($scope.question == null) {
        $scope.question = {};
        $scope.question.answers = [];
        var choice1 = {};
        var choice2 = {};
        var choice3 = {};
        var choice4 = {};
        $scope.question.answers.push(choice1);
        $scope.question.answers.push(choice2);
        $scope.question.answers.push(choice3);
        $scope.question.answers.push(choice4);
    } else {
        $scope.question.answers = JSON.parse($scope.question.answers);
    }
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
    };
    $scope.saveQuestion = function () {
        if ($scope.question.id != null) {
            Data.put('editQuestions', $scope.question).then(function (result) {
                if (result.status != 'error') {
                    var x = angular.copy($scope.question);
                    x.save = 'update';
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
                console.log(result);
            });
        } else {
            Data.post('addQuestions', $scope.question).then(function (result) {
                console.log(result);
                if (result.status != 'error') {
                    var x = angular.copy($scope.question);
                    x.save = 'update';
                    $modalInstance.close(x);
                } else {
                    console.log(result);
                }
            });
        }
    };
    $scope.numberAnswer = function(){
        console.log($scope.numberdd);
        switch ($scope.number) {
            case '1':
                console.log("1");
                break;
            case '2':
                console.log("2");
                break;
            case '3':
                console.log("3");
                break;
            default:
        }
    };
});  
