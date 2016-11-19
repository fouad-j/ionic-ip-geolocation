
angular.module('ipInformation', ['ionic', 'ngCordova'])
.constant('CONFIG', {
  NAME: 'IP Geolocation',
  AUTHOR: {
    NAME: 'Fouad J',
    EMAIL: 'fouad.j [at] live [dot] fr',
    GITHUB: '/fouad-j',
    SITE: 'jfouad.com'
  },
  LICENCE: 'MIT',
  VERSION: '0.1'
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('home');
});
