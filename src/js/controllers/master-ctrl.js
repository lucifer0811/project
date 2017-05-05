/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', '$cookieStore','$rootScope','$cookies','Data', MasterCtrl]);

function MasterCtrl($scope, $cookieStore,$rootScope,$cookieStore,Data) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

    $scope.logout = function(){
        console.log("ss");
        $cookieStore.remove("currentUser");
    }

    Data.get('getById/'+ $cookieStore.get("currentUser") ).then(function(result){
        if(result.status != 'error'){
          $scope.currentUser = result[0];
          console.log($scope.currentUser);
        }else{
          console.log(result);
        }
      });
}