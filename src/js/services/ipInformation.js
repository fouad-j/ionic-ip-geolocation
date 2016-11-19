angular.module('ipInformation')
  .factory('ipInformation', ($http) => {
    return {
      getIpInformation: function(ip="") {
        return $http.get(`http://ip-api.com/json/${ip}`).then(response => response.data);
      }
    }
  });