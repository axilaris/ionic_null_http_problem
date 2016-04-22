angular.module('starter.controllers', [])

.filter('hrefToJS', function ($sce, $sanitize) {
    return function (text) {
        var regex = /href="([\S]+)"/g;
        var newString = $sanitize(text).replace(regex, "onClick=\"window.open('$1', '_blank', 'location=yes')\"");
        return $sce.trustAsHtml(newString);
    }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $http, $ionicPopup, baseURL, $cordovaNetwork) {
  $scope.policy = {
  };

  console.log("AppCtrl:" + $scope.policy);

  $scope.logout = function() {

      window.localStorage.clear();
      $state.go('login');

  };

})

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

//login controller
.controller('LoginCtrl', function($scope, $ionicPopup, $state, $http, baseURL, $cordovaNetwork, $q, $timeout) {
  $scope.data = {};

  if(window.localStorage['username'] != null){
    $state.go('app.dashboard');
  }
 
  $scope.login = function() {
    //var deferred = $q.defer();



            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
            }

/*
    if (window.cordova){
      if ($cordovaNetwork.isOffline()){
        var alertPopup = $ionicPopup.alert({
          title: 'No internet connection!',
        });
        return;
      }
    }
*/


    var postObject = new Object();
    postObject.username = $scope.data.username;
    postObject.password = $scope.data.password;

    // if exception meaning its not device
    try {

      console.log("uuid:" + device.uuid);
      console.log("model:" + device.model);
      console.log("cordova:" + device.cordova);

      if (device.platform == "Android" || device.platform == "iPhone" || device.platform == "iOS") 
      {
        postObject.device_id = device.uuid;
      }
      else // unsupported device
      {
        postObject.device_id = "ionic";
      }

    }
    catch (err)  // not device
    {
        console.log("not device so uuid: ionic");
        postObject.device_id = "ionic";
    }

    var req = {
      method: 'POST',
      url: baseURL,
      data: postObject
    };

    // $timeout(function() {
    //   deferred.resolve(); // this aborts the request!
    // }, 5000);

// code change
$http.post(baseURL, postObject).then(function successCallback(response) {
  // this callback will be called asynchronously
  // when the response is available

      console.log('Success', response);
      // resp.data contains the result

/*      
      //window.localStorage['username'] = resp.user.username;
      window.localStorage['username'] = "theusername";
 
      //clear form
      $scope.data.username = "";
      $scope.data.password = "";
*/
      // go to dashboard page on success
      $state.go('app.dashboard');

}, function errorCallback(response) {
  // called asynchronously if an error occurs
  // or server returns response with an error status.
  console.error('ERROR', response);
});

/* ORIGINAL
    $http(req).success(function(resp) {
      console.log('Success', resp);
      // resp.data contains the result

      
      //window.localStorage['username'] = resp.user.username;
      window.localStorage['username'] = "theusername";
 
      //clear form
      $scope.data.username = "";
      $scope.data.password = "";

      // go to dashboard page on success
      $state.go('app.dashboard');
    }).error(function(err) {
      console.error('ERROR', err);

      if (err)
      {
        if ("error_message" in err)
        {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: err.error_message
          });

        }
        else if ("error" in err)
        {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: err.error
          });
        }
      }
      else // XXXX WHY DOES IT GOES HERE ???
      {
        console.error('EXCEPTION ERROR', err);
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Exception. Try Again. Network resource maybe loading'
        });        
      }

    })
*/


  }


})


.controller('DashboardCtrl', function($scope, $state, $cordovaNetwork, $ionicPopup) {

  $scope.dash = {
    username: window.localStorage['username'],
  }


})


