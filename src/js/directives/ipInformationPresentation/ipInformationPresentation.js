angular.module('ipInformation')
  .component('ipInformationPresentation', {
    templateUrl: 'directives/ipInformationPresentation/ipInformationPresentation.html',
    controller: 'ipInformationPresentationController as ipInfoPresentationCtrl',
    bindings: {
        ipInformation: '<'
    }
  })
  .controller('ipInformationPresentationController', function() {
  });
