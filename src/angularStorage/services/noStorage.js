angular.module('angular-storage.noStorage', [])
  .service('noStorage', function () {
    this.set = function() {};
    this.get = function() {};
    this.remove = function() {};
  });
