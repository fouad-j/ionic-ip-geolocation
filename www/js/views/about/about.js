angular.module('ipInformation')
  .config(function($stateProvider) {
    $stateProvider.state('about', {
      url: '/about',
      templateUrl: 'js/views/about/about.html',
      controller: 'aboutController as aboutCtrl'
    });
  })
  .controller('aboutController', function(CONFIG) {
    this.config = CONFIG;
  });