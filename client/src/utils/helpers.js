// HELPERS

// open connection to idb passing in name `storeName` and perform transaction using method and object values 
export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
      // open connection to database `shop-shop` with version 1
      const request = window.indexedDB.open('webdev', 1);
  
      // create variables to hold referenece to the database, transaction (tx), and object store
      let db, tx, store;
  
      // if version has changed(or first time using the database), run this method to create the 3 object stores
      request.onupgradeneeded = function (e) {
        const db = request.result;
  
        // create object store for each type of data and set "primary" key index to be `_id` of the data
        db.createObjectStore('products', { keyPath: '_id' });
        db.createObjectStore('categories', { keyPath: '_id' });
        db.createObjectStore('cart', { keyPath: '_id' });
      };
  
      // handle errors with connecting
      request.onerror = function (e) {
        console.log('There was an error');
      };
  
      //  on database open success
      request.onsuccess = function (e) {
        // save a reference of the db to the `db` variable
        db = request.result;
        // open a transaction do whatever we pass into `storeName` (must match one of the objectStore names)
        tx = db.transaction(storeName, 'readwrite');
        // save a reference to that objectStore 'products', 'categories', 'cart'
        store = tx.objectStore(storeName);
  
        db.onerror = function (e) {
          console.log('error', e);
        };
  
        switch (method) {
          case 'put':
            store.put(object);
            resolve(object);
            break;
          case 'get':
            const all = store.getAll();
            all.onsuccess = function () {
              resolve(all.result);
            };
            break;
          case 'delete':
            store.delete(object._id);
            break;
          default:
            console.log('No valid method');
            break;
        };
  
        // when transaction is complete, close the connection
        tx.oncomplete = function () {
          db.close();
        };
      };
  
    });
  }

  export default idbPromise;