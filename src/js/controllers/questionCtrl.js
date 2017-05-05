app.controller('questionCtrl',[ '$scope', '$filter', 'Data' ,function ($scope, $filter, Data){
    Data.get('questions').then(function(data){
      $scope.questions = data;
    });

    $scope.columns = [
      {text:"#",predicate:"ID",sortable:true},
      {text:"Title",predicate:"title",sortable:true},
      {text:"Category",predicate:"category",sortable:true},
      {text:"",predicate:"content",sortable:true},
    ];
    $scope.datail = function (question) {
        console.log(question);
    };
    $scope.deleteQuestions = function (question) {
      if(confirm("Are you sure!!!!")){
      Data.put('deleteQuestions',question ).then(function(result){
        $scope.questions = _.without($scope.questions, _.findWhere($scope.questions, {id:question.id}));
      });
    }
    };
}])
app.controller('addQuestionCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Upload', 'cloudinary', '$filter', 'Data','$window',
  function ($scope, $rootScope, $routeParams, $location, $upload, cloudinary, $filter, Data,$window){
   Data.get('categories').then(function (data) {
        $scope.categories = data;
    });
    if ($scope.question == null) {
        $scope.question = {};
        $scope.question.answers = [];
        var choice1 = {"id" : 1};
        var choice2 = {"id" : 2};
        var choice3 = {"id" : 3};
        var choice4 = {"id" : 4};
        $scope.question.answers.push(choice1);
        $scope.question.answers.push(choice2);
        $scope.question.answers.push(choice3);
        $scope.question.answers.push(choice4);
    }
    var url = null;
    $rootScope.url = "";
    var d = new Date();
    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title,
              file: file
            }
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          }).success(function (data, status, headers, config) {
            console.log(data.url);
            $rootScope.url = data.url;
            $rootScope.photos = $rootScope.photos || [];
            data.context = {custom: {photo: $scope.title}};
            file.result = data;
            $rootScope.photos.push(data);
            $scope.question.file = $rootScope.url;
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };
    //});

    /* Modify the look and fill of the dropzone when files are being dragged over it */
    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
        for (var i = 0 ; i < items.length; i++) {
          if (items[i].kind == 'file') {
            hasFile = true;
            break;
          }
        }
      } else {
        hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
    };
    $scope.saveQuestion = function () {
      $scope.question.file = $rootScope.url;
      console.log($scope.question.file)
            Data.post('addQuestions', $scope.question).then(function (result) {
                console.log(result);
                if (result.serverStatus != '2') {
                    var x = angular.copy($scope.question);
                    x.save = 'update';
                } else {
                  var host = $window.location.host;
                  var landingUrl = "http://" + host + "/#/questions";
                  console.log(landingUrl);
                  $window.location.href = landingUrl;
                    console.log(result);
                }
            });
    };

}])
app.controller('editQuestionCtrl', ['$scope', '$rootScope', '$stateParams','Upload', '$location', '$filter', 'Data','$window',
  function ($scope, $rootScope, $stateParams, $location, Upload,  $filter, Data,$window){
    $scope.id = $stateParams.id;
    console.log($scope.id);

    

    Data.get('categories').then(function (data) {
        $scope.categories = data;
    });
    Data.get('questions/edit/'+$stateParams.id).then(function(data){
      $scope.question = data[0];
      $scope.question.answers = JSON.parse($scope.question.answers);
      $rootScope.photos =  $scope.question.file
    });

    var url = null;
    $rootScope.url = "";
    var d = new Date();
    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title,
              file: file
            }
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          }).success(function (data, status, headers, config) {
            console.log(data.url);
            $rootScope.url = data.url;
            $rootScope.photos = $rootScope.photos || [];
            data.context = {custom: {photo: $scope.title}};
            file.result = data;
            $rootScope.photos.push(data);
            $scope.question.file = $rootScope.url;
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };
    //});

    /* Modify the look and fill of the dropzone when files are being dragged over it */
    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
        for (var i = 0 ; i < items.length; i++) {
          if (items[i].kind == 'file') {
            hasFile = true;
            break;
          }
        }
      } else {
        hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
    };

    $scope.saveQuestion = function () {
      Data.post('editQuestions', $scope.question).then(function (result) {
                console.log(result);
                if (result.serverStatus != '2') {
                    x.save = 'update';
                } else {
                  var host = $window.location.host;
                  var landingUrl = "http://" + host + "/project/online_exam/#/home";
                  console.log(landingUrl);
                  $window.location.href = landingUrl;
                    console.log(result);
                }
            });

    };

}]);
