app.controller('examCtrl', ['$scope', '$filter', '$uibModal', 'Data',
  function($scope, $filter, $uibModal, Data){

  Data.get('examies').then(function(data){
    $scope.examies = data;
    $scope.viewby = 5;
    $scope.totalItems = $scope.examies.length;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5;

    $scope.setPage = function(pageNo){
      $scope.currentPage = pageNo;
    }

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    }

    $scope.setItemsPerPage = function(num){
      $scope.itemsPerPage = num;
      $scope.currentPage = 1;
    }
  });


  $scope.open = function(p, size){
    var modalInstance = $uibModal.open({
      templateUrl: 'templates/examies/examNew.html',
      controller: 'examNewCtrl',
      size: size,
      resolve: {
        item: function() {
          return p;
        }
      }
    });
    modalInstance.result.then(function(selectedObject){
      $scope.examies.push(selectedObject);
      $scope.examies = $filter('orderBy')($scope.examies, 'id', 'reverse');
    });
  };

  $scope.edit = function (p,size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'templates/examies/edit.html',
      controller: 'examEditCtrl',
      size: size,
      resolve: {
        item: function () {
          return p;
        }
      }
    });
    modalInstance.result.then(function(selectedObject) {
      p.name = selectedObject.name;
      p.open_time = selectedObject.open_time;
      p.close_time = selectedObject.close_time;
    });
  };

  $scope.deleteExam = function(exam){
    if(confirm("Are you sure delete exam")){
      Data.delete('examies/'+exam.id).then(function(result){
        $scope.examies = _.without($scope.examies, _.findWhere($scope.examies, {id:exam.id}));
      });
    }
    Data.get('examies/'+exam.id+'/sections').then(function(data){
      var sections = data;
      for(var i = 0; i < sections.length; i++){
        Data.get('sections/'+ sections[i].id ).then(function(data){
          var section_questions = data;
          for(var j = 0; j < section_questions.length; j++){
            Data.delete('section_questions/'+section_questions[j].id).then(function(result){});
          }
        });
      }
      for(var z = 0; z <sections.length; z++){
        Data.delete('examies/'+exam.id+'/sections/'+sections[z].id).then(function(result){});
      }
    });
  };

  $scope.columns = [
      {text:"Tên",predicate:"name",sortable:true},
      {text:"Thời gian bắt đầu",predicate:"open_time",sortable:true},
      {text:"Thời gian kết thúc",predicate:"close_time",sortable:false},
      {text:"Hành động"}
    ];
}]);

app.controller('examNewCtrl', ['$scope', '$uibModalInstance', '$http', 'Data',
  function($scope, $uibModalInstance, $http, Data){
  $scope.cancel = function() {
    $uibModalInstance.dismiss('Close');
  }
  $scope.title = 'Tạo mới cuộc thi';
  $scope.buttonText = 'Thêm cuộc thi';
  $scope.addExam = function(exam) {
    Data.post('examies', exam).then(function (result) {
      if(result.status != 'error'){
        var x = angular.copy(exam);
        x.save = 'insert';
        x.id = result.data;
        $uibModalInstance.close(x);
      }else{
        console.log(result);
      }
    });
  }
}]);

app.controller('examEditCtrl', ['$scope', '$uibModalInstance', 'item', 'Data',
  function ($scope, $uibModalInstance, item, Data){
  item.open_time = new Date(item.open_time);
  item.close_time = new Date(item.close_time);
  $scope.exam = angular.copy(item);
  $scope.cancel = function() {
    $uibModalInstance.dismiss('Close');
  }

  $scope.title = 'Chỉnh sửa cuộc thi';
  $scope.buttonText = 'Cập nhật';
  var original = item;
  $scope.isClean = function(){
    return angular.equals(original, $scope.exam);
  }

  $scope.saveExam = function(exam) {
    Data.put('examies/'+exam.id, $scope.exam).then(function (result){
      if (result.status != 'error'){
        var x = angular.copy(exam);
        x.save = 'update';
        $uibModalInstance.close(x);
      }else{
        console.log(result);
      }
    });
  }
}]);

app.controller('detailExamCtrl', ['$scope', '$http', '$stateParams', '$routeParams', 'Data',
  function($scope, $stateParams, $routeParams, $http, Data){
  $scope.id_exam = $routeParams.id;

  Data.get('examies/'+$routeParams.id).then(function(data){
    $scope.examies = data;
  });

  Data.get('section_questions').then(function(data){
    $scope.section_questions = data;
  });

  Data.get('examies/'+$routeParams.id+'/sections').then(function(data){
    angular.forEach(data, function(value, key) {
      Data.get('examies/'+ value.id +'/question').then(function(data){
        value.question = data;
      });
    })
    $scope.sections = data;
  });

  $scope.total_mark = function(exam){
  }

  $scope.getdetails = function(section, question){
    var section_question_id;
    angular.forEach($scope.section_questions, function(value, key) {
      if (value.section_id == section.id && value.question_id == question.id){
        section_question_id = value.id;
      }
    });
    var section_question = {
        id: section_question_id,
        mark: question.mark,
        question_id: question.id,
        section_id: section.id
    };
    Data.put('section_questions/'+section_question_id, section_question).then(function (result){
      if (result.status != 'error'){
        var x = angular.copy(section_question);
      }else{
        console.log(result);
      }
    });
  };

  $scope.deleteSectionQuestion = function(question_id, section_id){
    var section_question_id;
    angular.forEach($scope.section_questions, function(value, key) {
      if (value.section_id == section_id && value.question_id == question_id){
        section_question_id = value.id;
      }
    });
    if(confirm("Are you sure!!!!")){
      Data.delete('section_questions/'+section_question_id).then(function(result){
        $scope.section_questions = _.without($scope.section_questions, _.findWhere($scope.section_questions, {id:section_question_id}));
      });
    }
  };
}]);
