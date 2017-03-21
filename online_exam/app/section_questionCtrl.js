app.controller('section_questionCtrl', function($scope, $rootScope, $modalInstance, $http, Data){
  Data.get('categories').then(function(data){
    $scope.categories = data;
  });

  $scope.category_id_in_form;

  $scope.questions = {};

  $scope.number_question_random;

  $scope.list_questions_chooes = [];

  function create_ids_section_question(n, m){
    var a = [];
    while(a.length < n) {
      v = Math.floor(Math.random() * m) + 1 ;
      if(a.indexOf(v) < 0){
        a.push(v);
      }
    }
    return a;
  }
  $scope.update = function(){
    $scope.category_id_in_form = $scope.category.id;
  }

  $scope.push_question_section = function() {
    var list_question_ids = []; // chu khai bao scope cua no chi o
    debugger;
    Data.get('categories/'+$scope.category_id_in_form).then(function(d){
      debugger;
      var list_questions = d;
      list_question_ids = d;
      console.log($scope.number_question_random);
      console.log(list_question_ids);
    });
    $modalInstance.close(x);
  }
    // debugger;
    // $scope.list = {};
    // var $count = 0;
    // Data.get('categories/'+$scope.category_id_in_form).then(function(data){
    //   $scope.list = data;
    //   console.log(typeof(data));
    //   console.log($scope.list);
    // });

  $scope.cancel = function() {
    $modalInstance.dismiss('Close');
  }

  $scope.stateChanged = function(q, checked){
    if(q.id > 0 && checked){
      $scope.list_questions_chooes.push(q.id);
    }
    console.log($scope.list_questions_chooes);
  }
});
