app.controller('signupCtrl',[ '$scope', '$filter', 'Data' ,'md5','$window',function ($scope, $filter, Data,md5,$window){

	 $scope.signup = function (){
	 user = $scope.user;
	 user.password = md5.createHash(user.password);
	 	console.log($scope.user);
	 	Data.post('signup', user).then(function (result) {
                console.log(result);
                if (result.serverStatus != '2') {
                    var x = angular.copy($scope.question);
                    x.save = 'update';
                } else {
                  var host = $window.location.host;
                  var landingUrl = "http://" + host + "/#";
                  $window.location.href = landingUrl;
                }
            });
	 }

}])

app.controller('loginCtrl',[ '$scope', '$filter', 'Data' ,'md5','$window','$rootScope','$cookieStore',
  function ($scope, $filter, Data,md5,$window,$rootScope,$cookieStore){
	 $scope.login = function (){
      user = $scope.user;
      user.password = md5.createHash(user.password);
      Data.get('getByEmail/'+ user.email ).then(function(result){
        if(result.status != 'error'){
          if(user.password == result[0].password){
            $cookieStore.put("currentUser", result[0].id);
          } else{
            console.log("d");
          }
          // $location.path('/');
        }else{
          console.log(result);
        }
      });
	 }

}])

app.controller('logoutCtrl',[ '$scope', '$filter', 'Data' ,'md5','$window','$rootScope','$cookieStore',
  function ($scope, $filter, Data,md5,$window,$rootScope,$cookieStore){
   $scope.login = function (){
      user = $scope.user;
      user.password = md5.createHash(user.password);
      Data.get('getByUser/'+ user.username ).then(function(result){
        if(result.status != 'error'){
          user_infor = result[0];
          if(user.password == result[0].password){
            $cookieStore.put("currentUser", result[0].firstName);
          } else{
            console.log("d");
          }
        }else{
          console.log(result);
        }
      });
   }

}])

app.controller('changePassCtrl',[ '$scope', '$filter', 'Data' ,'md5','$window','$rootScope','$cookieStore',
  function ($scope, $filter, Data,md5,$window,$rootScope,$cookieStore){
    $scope.changePass = function (){
      old_pass = md5.createHash($scope.old_password);
      new_pass = md5.createHash($scope.new_password);
      console.log(old_pass);
      Data.get('getById/'+ $cookieStore.get("currentUser") ).then(function(result){
        if(result.status != 'error'){
          $scope.currentUser = result[0];
          if(old_pass == result[0].password)
          console.log($scope.currentUser);
        }else{
          console.log(result);
        }
      });
   }
}])

app.controller('profileCtrl',[ '$scope', '$filter', 'Data' ,'md5','$window','$rootScope','$cookieStore',
  function ($scope, $filter, Data,md5,$window,$rootScope,$cookieStore){
    
}])