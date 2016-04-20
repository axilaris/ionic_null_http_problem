// Ionic Starter App




// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'ngSanitize', 'starter.controllers', 'starter.services', 'starter.directives', 'chart.js', 'onezone-datepicker', 'ionic-timepicker', 'btford.socket-io', 'pasvaz.bindonce'])

.run(function($ionicPlatform, $rootScope, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }



    // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        }).then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
    }
  });
})

// //show loading indicator on every http call
// .config(function( AjaxInterceptorProvider ) {
//         AjaxInterceptorProvider.config({
//             title: "Connection failure",
//             defaultMessage: "Failed to retrieve information. Please make sure that you have internet connectivity."
//         });
//     })
// .run(function (AjaxInterceptor) {
//     AjaxInterceptor.run();
// })

//http timeout
.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q) {
        return {
            request: function (config) {
                config.timeout = 1000;
                return config;
            },
            responseError: function (rejection) {
                switch (rejection.status){
                    case 408 :
                        console.log('connection timed out');
                        break;
                }
                return $q.reject(rejection);
            }
        }
    })
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })  


  .state('app', {
    url: '/app',
    cache: false,
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.dashboard', {
    cache: false,
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardCtrl'
        }
      }
    })


  $urlRouterProvider.otherwise('/login');

  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  //align page title to center
  $ionicConfigProvider.navBar.alignTitle('center');
});
