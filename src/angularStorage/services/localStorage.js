angular.module('angular-storage.localStorage', ['angular-storage.noStorage'])
  .service('localStorage', function ($window, $injector) {
    try {
      $window.localStorage.setItem('testKey', 'test');
      $window.localStorage.removeItem('testKey');
      this.storageAvailable = true;
    } catch(e) {
      this.storageAvailable = false;
    }

    if (this.storageAvailable) {
      this.set = function (what, value) {
        return $window.localStorage.setItem(what, value);
      };

      this.get = function (what) {
        return $window.localStorage.getItem(what);
      };

      this.remove = function (what) {
        return $window.localStorage.removeItem(what);
      };
    } else {
      var noStorage = $injector.get('noStorage');

      this.set = noStorage.set;
      this.get = noStorage.get;
      this.remove = noStorage.remove;
    }
  });
