'use strict';

describe('angularStorage store', function() {

  beforeEach(function() {
    module('angular-storage.store');
  });

  it('should save items correctly in localStorage', inject(function(store) {
    var value = 1;
    store.set('gonto', value);
    expect(store.get('gonto')).to.equal(value);
  }));

  it('should save null items correctly in localStorage', inject(function(store) {
    store.set('gonto', null);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.equal(null);
  }));

  it('should save undefined items correctly in localStorage', inject(function(store) {
    store.set('gonto', undefined);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.equal(undefined);
  }));

  it('should delete items correctly from localStorage', inject(function(store) {
    var value = 1;
    store.set('gonto', value);
    expect(store.get('gonto')).to.equal(value);
    store.remove('gonto');
    expect(store.get('gonto')).to.not.exist;
  }));

  it('should save objects correctly', inject(function(store) {
    var value = {
      gonto: 'hola'
    };
    store.set('gonto', value);
    expect(store.get('gonto')).to.eql(value);
  }));

  it('should save objects correctly', inject(function(store) {
    var value = {
      gonto: 'hola'
    };
    store.set('gonto', value);
    expect(store.get('gonto')).to.eql(value);
  }));

  it('should save and objects correctly without cache', inject(function(store) {
    var value = {
      gonto: 'hola'
    };
    store.set('gonto', value);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.eql(value);
    expect(store.get('gonto')).not.to.equal(value);
  }));

  it('should save and objects correctly without cache', inject(function(store) {
    var value = {
      gonto: 'hola'
    };
    store.set('gonto', value);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.eql(value);
    expect(store.get('gonto')).not.to.equal(value);
  }));
});

describe('angularStorage storeProvider.setStore("sessionStorage")', function () {

  var provider;

  beforeEach(function() {
    module('angular-storage.store', function(storeProvider) {
      provider = storeProvider;
      provider.setStore('sessionStorage');
    });
  });

  it('should save items correctly in the sessionStorage', inject(function(store, $window) {
    var value = 99;
    store.set('gonto123', value);
    store.inMemoryCache = {};

    expect(store.get('gonto123')).to.equal(value);
    expect($window.sessionStorage.getItem('gonto123')).to.exist;
    expect($window.sessionStorage.getItem('gonto123')).to.equal(value.toString());

    store.remove('gonto123');

    expect(store.get('gonto123')).to.not.exist;
    expect($window.sessionStorage.getItem('gonto123')).to.not.exist;
  }));
});

describe('angularStorage storeProvider.setStore("sessionStorage")', function () {

  var provider, windowMock;

  beforeEach(function() {
    module('angular-storage.store', function(storeProvider, $provide) {
      provider = storeProvider;
      provider.setStore('sessionStorage');

      windowMock = { sessionStorage: undefined };
      $provide.value('$window', windowMock);
    });
  });

  it('should fallback to in-memory caching', inject(function(store) {
    var value = 99;
    store.set('gonto123', value);

    expect(store.get('gonto123')).to.equal(value);
    store.inMemoryCache = {};
    expect(store.get('gonto123')).to.not.exist;
  }));
});

describe('angularStorage storeProvider.setStore("localStorage")', function () {

  var provider;

  beforeEach(function() {
    module('angular-storage.store', function(storeProvider) {
      provider = storeProvider;
      provider.setStore('localStorage');
    });
  });

  it('should save items correctly in the localStorage', inject(function(store, $window) {
    var value = 55;
    store.set('gonto', value);

    expect(store.get('gonto')).to.equal(value);
    expect($window.localStorage.getItem('gonto')).to.exist;
    expect($window.localStorage.getItem('gonto')).to.equal(value.toString());
  }));
});

describe('angularStorage storeProvider.setStore()', function () {

  var provider;

  beforeEach(function() {
    module('angular-storage.store', function(storeProvider) {
      provider = storeProvider;
      provider.setStore();
    });
  });

  it('should save items correctly in the localStorage', inject(function(store, $window) {
    var value = 77;
    store.set('gonto', value);

    expect(store.get('gonto')).to.equal(value);
    expect($window.localStorage.getItem('gonto')).to.exist;
    expect($window.localStorage.getItem('gonto')).to.equal(value.toString());
  }));
});

describe('angularStorage storeProvider.setStore(123)', function () {

  var provider;

  beforeEach(function() {
    module('angular-storage.store', function(storeProvider) {
      provider = storeProvider;
      provider.setStore(123);
    });
  });

  it('should save items correctly in the localStorage', inject(function(store, $window) {
    var value = 77;
    store.set('gonto', value);

    expect(store.get('gonto')).to.equal(value);
    expect($window.localStorage.getItem('gonto')).to.exist;
    expect($window.localStorage.getItem('gonto')).to.equal(value.toString());
  }));
});

describe('angularStorage storeProvider.setStore("abc")', function () {

  var provider;

  beforeEach(function() {
    module('angular-storage.store', function(storeProvider) {
      provider = storeProvider;
      provider.setStore('abc');
    });
  });

  it('should throw an error when the store is not found', function() {
    expect(function() { inject(function(store){ store.get('a');}); } ).to.throw();
  });
});

describe('angularStorage store: in-memory caching fallback', function() {

  // these tests ensure that the in-memory caching fallback works correctly.

  var windowMock;

  /* provide a mock for $window where localStorage is not defined */
  beforeEach(module('angular-storage.store', function ($provide) {
      windowMock = { localStorage: undefined };
      $provide.value('$window', windowMock);
  }));

  it('should save items correctly in localStorage', inject(function(store) {
    var value = 1;
    store.set('gonto', value);
    expect(store.get('gonto')).to.equal(value);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.not.exist;
  }));

  it('should save null items correctly in localStorage', inject(function(store) {
    store.set('gonto', null);
    expect(store.get('gonto')).to.equal(null);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.not.exist;
  }));

  it('should save undefined items correctly in localStorage', inject(function(store) {
    store.set('gonto', undefined);
    expect(store.get('gonto')).to.equal(undefined);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.not.exist;
  }));

  it('should delete items correctly from localStorage', inject(function(store) {
    var value = 1;
    store.set('gonto', value);
    expect(store.get('gonto')).to.equal(value);
    store.remove('gonto');
    expect(store.get('gonto')).to.not.exist;
  }));

  it('should save objects correctly', inject(function(store) {
    var value = {
      gonto: 'hola'
    };
    store.set('gonto', value);
    expect(store.get('gonto')).to.eql(value);
    store.inMemoryCache = {};
    expect(store.get('gonto')).to.not.exist;
  }));
});

describe('angularStorage new namespaced store', function() {
  beforeEach(function() {
    module('angular-storage.store');
  });

  var newStore = null;

  beforeEach(inject(function(store) {
    newStore = store.getNamespacedStore('auth0');
  }));

  it('should save items correctly', inject(function($window) {
    var value = 1;
    newStore.set('myCoolValue', value);
    expect(newStore.get('myCoolValue')).to.equal(value);
    expect($window.localStorage.getItem('auth0.myCoolValue')).to.exist;
    expect($window.localStorage.getItem('myCoolValue')).to.not.exist;
  }));

  it('should delete items correctly from localStorage', function() {
    var value = 1;
    newStore.set('gonto', value);
    expect(newStore.get('gonto')).to.equal(value);
    newStore.remove('gonto');
    expect(newStore.get('gonto')).to.not.exist;
  });

  it('should save objects correctly', function() {
    var value = {
      gonto: 'hola'
    };
    newStore.set('gonto', value);
    expect(newStore.get('gonto')).to.eql(value);
  });

  it('should save objects correctly', function() {
    var value = {
      gonto: 'hola'
    };
    newStore.set('gonto', value);
    expect(newStore.get('gonto')).to.eql(value);
  });

  it('should save and objects correctly without cache', function() {
    var value = {
      gonto: 'hola'
    };
    newStore.set('gonto', value);
    newStore.inMemoryCache = {};
    expect(newStore.get('gonto')).to.eql(value);
    expect(newStore.get('gonto')).not.to.equal(value);
  });

  it('should save and objects correctly without cache', function() {
    var value = {
      gonto: 'hola'
    };
    newStore.set('gonto', value);
    newStore.inMemoryCache = {};
    expect(newStore.get('gonto')).to.eql(value);
    expect(newStore.get('gonto')).not.to.equal(value);
  });

  it('should should save items correctly when the delimiter is set', inject(function(store, $window) {
    var value = 111;
    var aStore = store.getNamespacedStore('aa', 'sessionStorage', '-');
    aStore.set('wayne', value);

    expect(aStore.get('wayne')).to.equal(value);
    expect($window.sessionStorage.getItem('aa-wayne')).to.exist;
    expect($window.sessionStorage.getItem('aa-wayne')).to.equal(value.toString());
    expect($window.sessionStorage.getItem('wayne')).to.not.exist;
  }));

  describe('with param storage', function () {
    it('should should save items correctly when the storage is set to sessionStorage', inject(function(store, $window) {
      var value = 111;
      var sessionStore = store.getNamespacedStore('aa', 'sessionStorage');
      sessionStore.set('wayne', value);

      expect(sessionStore.get('wayne')).to.equal(value);
      expect($window.sessionStorage.getItem('aa.wayne')).to.exist;
      expect($window.sessionStorage.getItem('aa.wayne')).to.equal(value.toString());
      expect($window.sessionStorage.getItem('wayne')).to.not.exist;
    }));

    it('should should save items correctly when the storage is set to localStorage', inject(function(store, $window) {
      var value = 222;
      var localStore = store.getNamespacedStore('bb', 'localStorage');
      localStore.set('wayne', value);

      expect(localStore.get('wayne')).to.equal(value);
      expect($window.localStorage.getItem('bb.wayne')).to.exist;
      expect($window.localStorage.getItem('bb.wayne')).to.equal(value.toString());
      expect($window.localStorage.getItem('wayne')).to.not.exist;
    }));
  });
});

