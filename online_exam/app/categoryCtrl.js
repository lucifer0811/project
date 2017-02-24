app.controller('categoryCtrl', function ($scope, $modal, $filter, Data) {
    $scope.categories = {};

    Data.get('categories').then(function(data){
        $scope.categories = data;
    });

    $scope.columns = [
      {text:"ID",predicate:"id",sortable:true,dataType:"number"},
      {text:"Name",predicate:"name",sortable:true},
      {text:"Descriptions",predicate:"descriptions",sortable:true},
    ];
})
