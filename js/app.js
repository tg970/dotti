const app = angular.module('dotti_App', []);

app.controller('MainController', ['$http', function($http) {
  this.test = 'Dotti Yeah';
}]);
