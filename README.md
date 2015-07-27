# angular-storage

A Storage done right for AngularJS (fork without cookie fallback)

## Key Features

* Uses **`localStorage` or `sessionStorage` by default but if it's not available, it just relies on in-memory caching**.
* Lets you **save JS Objects**
* If **you save a `Number`, you get a `Number`**, not a String
* Uses a **caching system** so that if you already have a value, it won't get it from the store again.

## Installing it

````bash
bower install angular-storage-no-cookies
````

## Using it

````js
angular.module('app', ['angular-storage'])
.controller('Controller', function(store) {
  var myObj = {
    name: 'mgonto'
  };

  store.set('obj', myObj);

  var myNewObject = store.get('obj');

  angular.equals(myNewObject, myObj); // return true

  store.remove('obj');

  store.set('number', 2);

  typeof(store.get('number')) === 'number'
});
````

## Namespaced Storages

You can also create namespaced storages if you want

````js
angular.module('app', ['angular-storage'])
.factory('Auth0Store', function(store) {
  return store.getNamespacedStore('auth0');
})
.controller('Controller', function(Auth0Store) {

  var myObj = {
    name: 'mgonto'
  };
  
  // This will be saved in localStorage as auth0.obj
  Auth0Store.set('obj', myObj);

  // This will look for auth0.obj
  var myNewObject = Auth0Store.get('obj');

  angular.equals(myNewObject, myObj); // return true
});
````

## Changing storage type

```js
angular.module('app', ['angular-storage'])
  .config(function(storeProvider) {
    // Store defaults to localStorage but we can set sessionStorage or cookieStorage.
    storeProvider.setStore('sessionStorage');
  })
  .controller('Controller', function(store) {

  var myObj = {
    name: 'mgonto'
  };
  
  // This will be saved in sessionStorage as obj
  store.set('obj', myObj);

  // This will look for obj in sessionStorage
  var myNewObject = store.get('obj');

  angular.equals(myNewObject, myObj); // return true
});
```


## API

### storeProvider.setStore(storageName) 

Sets the underlying store for the `store` service. It can be `localStorage`, `sessionStorage` or `cookieStorage`. Defaults to `localStorage`

### store.set(name, value)

Sets a new `value` to the storage with the key `name`. It can be any object.

### store.get(name)

Returns the saved `value` with they key `name`. If you saved an object, you get an object.

### store.remove(name)

Deletes the saved `value` with the key `name`

### store.getNamespacedStore(namespace, delimiter)

Returns a new `store` service that will use the `namespace` and `delimiter` when saving and getting values like the following `namespace[delimiter]key`. For example `auth0.object` considering `auth0` as `namespace` and `.` as a `delimiter`

### store.storageAvailable

Indicates whether localStorage/sessionStorage is available or whether the fallback is active.

## Contributing

Just clone the repo, run `npm install`, `bower install` and then `gulp` to work :).

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## License

MIT

