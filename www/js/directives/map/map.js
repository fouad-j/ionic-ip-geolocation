angular.module('ipInformation')
  .component('map', {
    templateUrl: 'js/directives/map/map.html',
    controller: 'mapController as mapCtrl',
    bindings: {
        ipInformation: '<'
    }
  })
  .controller('mapController', function() {
  });
