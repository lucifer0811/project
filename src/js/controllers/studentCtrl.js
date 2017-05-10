app.controller('studentCtrl',['$scope', '$uibModal', '$filter', '$cookieStore', 'Data',
  function ($scope, $uibModal, $filter, $cookieStore, Data) {
  Data.get('getById/'+ sessionStorage.id ).then(function(result){
    $scope.currentUser = result[0];
  });

  Data.get('students').then(function(data){
    console.log($scope.currentUser);
    var list_student = []
    for (var i = 0; i <data.length; i++){
      if (data[i].user_id == $scope.currentUser.id){
        list_student.push(data[i]);
      }
    }
    $scope.students = list_student;
    $scope.viewby = 5;
    $scope.totalItems = $scope.students.length;
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

  $scope.columns = [
      {text:"STT"},
      {text:"Tên",predicate:"name",sortable:true},
      {text:"Email",predicate:"email",sortable:false}
    ];
}]);
