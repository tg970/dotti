const app = angular.module('dotti_App', ['ngMaterial']);

app.controller('MainController', ['$http', function($http) {
  this.test = 'Dotti Yeah';
}]);
