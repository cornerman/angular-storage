angular.module('angular-storage.sessionStorage', ['angular-storage.noStorage'])
  .service('sessionStorage', function ($window, $injector) {
    try {
      $window.sessionStorage.setItem('testKey', 'test');
      $window.sessionStorage.removeItem('testKey');
      this.storageAvailable = true;
    } catch(e) {
      this.storageAvailable = false;
    }

    if (this.storageAvailable) {
      this.set = function (what, value) {
        return $window.sessionStorage.setItem(what, value);
      };

      this.get = function (what) {
        return $window.sessionStorage.getItem(what);
      };

      this.remove = function (what) {
        return $window.sessionStorage.removeItem(what);
      };
    } else {
      var noStorage = $injector.get('noStorage');

      this.set = noStorage.set;
      this.get = noStorage.get;
      this.remove = noStorage.remove;
    }
  });
