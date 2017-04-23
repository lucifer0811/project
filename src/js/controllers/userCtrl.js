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
                  console.log(landingUrl);
                  $window.location.href = landingUrl;
                   console.log(result);
                }
            });
	 }

}])

app.controller('loginCtrl',[ '$scope', '$filter', 'Data' ,'md5','$window',function ($scope, $filter, Data,md5,$window){

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
                  console.log(landingUrl);
                  $window.location.href = landingUrl;
                   console.log(result);
                }
            });
	 }

}])