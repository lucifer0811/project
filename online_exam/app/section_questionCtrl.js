app.controller('section_questionCtrl', function($scope, $rootScope, $modalInstance, $http, Data){
  Data.get('categories').then(function(data){
    $scope.categories = data;
  });

  Data.get('questions').then(function(data){
    $scope.questions = data;
  });

  $scope.list_question_id_choose = [];

  $scope.category_id_in_form;

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

  function check_id_in_question(a){
    var i, j, count,z;
    var c = [];
    for(i = 0; i < a.length; i++){
      count = 1;
      for(j= i+1; j < a.length; j++){
        if(a[j] == a[i]){
          count++;
        }
      }
      if (count >= 2 &&  count%2 == 0){
        c.push(a[i]);
      }
    }
    for(i = 0;i<c.length;c++){
      for(j=0;j<a.length;j++){
        if(a[j] == c[i]){
          a.splice(j,1);
        }
      }
    }
    return a;
  }

  $scope.list_question_choose = function(question){
    $scope.list_question_id_choose.push(question.id);
  }

  $scope.create_section_question_by_choose_question = function(){
    $scope.list_question_id_choose = check_id_in_question($scope.list_question_id_choose);
    var section_id = $rootScope.id_section;
    for (i = 0; i < $scope.list_question_id_choose.length; i++) {
      var section_question = {
        question_id: $scope.list_question_id_choose[i],
        section_id: section_id,
      };
      Data.post('section_questions', section_question).then(function(result){
        var x = angular.copy(section_question);
        x.id = result.data;
        $modalInstance.close(x);
      });
    }
  }

  $scope.list_question_in_category = function(){
    Data.get('categories/'+$scope.category.id).then(function(data){
      $scope.questions = data;
    });
  };

  $scope.push_question_section = function() {
    Data.get('categories/'+$scope.category_id_in_form).then(function(data){
      var section_id = $rootScope.id_section;
      var b = [];
      var list_question_in_category = data;
      var number_question_random = $scope.number_question_random;
      b = create_ids_section_question(number_question_random, list_question_in_category.length );
      var list_category_ids = b.map(function(number){
         return list_question_in_category[number - 1].id;
        });
      console.log(list_question_in_category);
      console.log(list_category_ids);
      for (i = 0; i < list_category_ids.length; i++) {
        var section_question = {
          question_id: list_category_ids[i],
          section_id: section_id,
        };
        Data.post('section_questions', section_question).then(function(result){
            var x = angular.copy(section_question);
            x.id = result.data;
            $modalInstance.close(x);
          });
      }
    });
  }

  $scope.cancel = function() {
    $modalInstance.dismiss('Close');
  }

  $scope.stateChanged = function(q, checked){
    debugger;
    if(q.id > 0 && checked){
      $scope.list_questions_chooes.push(q.id);
    }
    console.log($scope.list_questions_chooes);
  }
});
