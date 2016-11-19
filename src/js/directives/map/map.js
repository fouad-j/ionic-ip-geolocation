angular.module('ipInformation')
  .component('map', {
    templateUrl: 'directives/map/map.html',
    controller: 'mapController as mapCtrl',
    bindings: {
        ipInformation: '<'
    }
  })
  .controller('mapController', function() {
  });
