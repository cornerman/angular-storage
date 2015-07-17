(function() {


// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

angular.module('angular-storage',
    [
      'angular-storage.store'
    ]);

angular.module('angular-storage.internalStore', ['angular-storage.localStorage', 'angular-storage.sessionStorage'])
  .factory('InternalStore', ["$log", "$injector", function($log, $injector) {

    function InternalStore(namespace, storage, delimiter) {
      this.namespace = namespace || null;
      this.delimiter = delimiter || '.';
      this.inMemoryCache = {};
      this.storage = $injector.get(storage || 'localStorage');
      this.storageAvailable = this.storage.storageAvailable;
    }

    InternalStore.prototype.getNamespacedKey = function(key) {
      if (!this.namespace) {
        return key;
      } else {
        return [this.namespace, key].join(this.delimiter);
      }
    };

    InternalStore.prototype.set = function(name, elem) {
      this.inMemoryCache[name] = elem;
      this.storage.set(this.getNamespacedKey(name), JSON.stringify(elem));
    };

    InternalStore.prototype.get = function(name) {
      var obj = null;
      if (name in this.inMemoryCache) {
        return this.inMemoryCache[name];
      }
      var saved = this.storage.get(this.getNamespacedKey(name));
      try {

        if (typeof saved === 'undefined' || saved === 'undefined') {
          obj = undefined;
        } else {
          obj = JSON.parse(saved);
        }

        this.inMemoryCache[name] = obj;
      } catch(e) {
        $log.error('Error parsing saved value', e);
        this.remove(name);
      }
      return obj;
    };

    InternalStore.prototype.remove = function(name) {
      delete this.inMemoryCache[name];
      this.storage.remove(this.getNamespacedKey(name));
    };

    return InternalStore;
  }]);


angular.module('angular-storage.localStorage', ['angular-storage.noStorage'])
  .service('localStorage', ["$window", "$injector", function ($window, $injector) {
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
  }]);

angular.module('angular-storage.noStorage', [])
  .service('noStorage', function () {
    this.set = function() {};
    this.get = function() {};
    this.remove = function() {};
  });

angular.module('angular-storage.sessionStorage', ['angular-storage.noStorage'])
  .service('sessionStorage', ["$window", "$injector", function ($window, $injector) {
    this.storageAvailable = !!$window.sessionStorage;

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
  }]);

angular.module('angular-storage.store', ['angular-storage.internalStore'])
  .provider('store', function() {

    // the default storage
    var _storage = 'localStorage';

    /**
     * Sets the storage.
     *
     * @param {String} storage The storage name
     */
    this.setStore = function(storage) {
      if (storage && angular.isString(storage)) {
        _storage = storage;
      }
    };

    this.$get = ["InternalStore", function(InternalStore) {
      var store = new InternalStore(null, _storage);

      /**
       * Returns a namespaced store
       *
       * @param {String} namespace The namespace
       * @param {String} storage The name of the storage service
       * @param {String} key The key
       * @returns {InternalStore}
       */
      store.getNamespacedStore = function(namespace, storage, key) {
        return new InternalStore(namespace, storage, key);
      };

      return store;
    }];
  });


}());