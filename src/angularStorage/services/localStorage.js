angular.module('angular-storage.localStorage', ['angular-storage.noStorage'])
  .service('localStorage', function ($window, $injector) {
    var localStorageAvailable;

    try {
      $window.localStorage.setItem('testKey', 'test');
      $window.localStorage.removeItem('testKey');
      localStorageAvailable = true;
    } catch(e) {
      localStorageAvailable = false;
    }

    if (localStorageAvailable) {
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
