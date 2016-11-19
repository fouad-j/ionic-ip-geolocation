angular.module('ipInformation')
  .component('share', {
    templateUrl: 'directives/share/share.html',
    controller: 'shareController as shareCtrl',
  })
  .controller('shareController', function($cordovaSocialSharing) {
    this.shareApp = function() {
      $cordovaSocialSharing.share("Discover this android application that displays the location of your or any other IP address on a map", "IP Geolocation", null, "https://jfouad.com");
    }
  });
