angular.module('ipInformation')
  .config(function($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'js/views/home/home.html',
      controller: 'homeController as homeCtrl'
    });
  })
  .controller('homeController', function(ipInformation, CONFIG) {
    ipInformation.getIpInformation().then(data => {
      this.currentIp = this.ipInformation = data;
      loadMap(data.lat, data.lon);
    });
    this.submit = form => ipInformation.getIpInformation(this.ipAddress).then(data => {
      this.ipInformation = data;
      loadMap(data.lat, data.lon);
    });
    this.reset = () => {
      this.ipInformation = this.currentIp; 
      this.ipAddress = "";
      loadMap(this.currentIp.lat, this.currentIp.lon);
    }
    this.appName = CONFIG.NAME;
    

    let loadMap = (latitude, longitude) => {
      let myLatlng = new google.maps.LatLng(latitude, longitude);

      let mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
      };

      this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }
  });