/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-vars */
export default class IndexedDbRepository {
  constructor(dbName, storeName) {
    this._dbName = dbName;
    this._storeName = storeName;
  }

  createRequest(dbName, storeName) {
    const openReq = indexedDB.open(dbName);

    openReq.onupgradeneeded = function(event) {
      const db = event.target.result;
      const os = db.createObjectStore(storeName, { keyPath: "id" });
    };

    return openReq;
  }

  put(data) {
    return new Promise((resolve, reject) => {
      const req = this.createRequest(this._dbName, this._storeName);
      req.onsuccess = event => {
        const db = event.target.result;
        const trans = db.transaction(this._storeName, "readwrite");
        const store = trans.objectStore(this._storeName);

        try {
          const putReq = store.put(data);

          putReq.onsuccess = () => {
            console.log("put data success");
            resolve();
          };

          req.onerror = event => {
            console.log("put data fails");
          };

          trans.oncomplete = () => {
            console.log("transactoin complete");
          };
        } catch (error) {
          console.log(error);
          reject(error.message);
        }
      };
    });
  }

  add(aList) {
    return new Promise((resolve, reject) => {
      const req = this.createRequest(this._dbName, this._storeName);
      req.onsuccess = event => {
        const db = event.target.result;
        const trans = db.transaction(this._storeName, "readwrite");
        trans.oncomplete = () => {
          console.log("transaction complete");
          resolve();
        };

        trans.onerror = event => {
          console.log(event);
          reject();
        };

        const store = trans.objectStore(this._storeName);
        aList.forEach(data => {
          try {
            const addReq = store.add(data);
            addReq.onsuccess = () => {
              console.log("add data success");
            };
            addReq.onerror = event => {
              console.log(`add data fails ${event.target.error}`);
            };
          } catch (error) {
            console.log(error);
            reject(error.message);
          }
        });
      };
    });
  }

  get(keyValue) {
    return new Promise((resolve, reject) => {
      const req = this.createRequest(this._dbName, this._storeName);
      req.onsuccess = event => {
        const db = event.target.result;
        const trans = db.transaction(this._storeName, "readwrite");
        const store = trans.objectStore(this._storeName);

        try {
          const getReq = store.get(keyValue);

          getReq.onsuccess = event => {
            const result = event.target.result;
            console.log(result);
            if (result === undefined) {
              reject(`id:${keyValue} not found`);
            } else {
              resolve(result);
            }
          };
        } catch (error) {
          console.log(error);
          reject(error.message);
        }
      };
    });
  }

  openCursor() {
    return new Promise((resolve, reject) => {
      const req = this.createRequest(this._dbName, this._storeName);
      req.onsuccess = event => {
        const db = event.target.result;
        const trans = db.transaction(this._storeName, "readwrite");
        const store = trans.objectStore(this._storeName);

        try {
          const getReq = store.openCursor();
          const result = [];
          getReq.onsuccess = event => {
            const cur = event.target.result;
            if (!cur) return resolve(result);
            result.push(cur.value);
            cur.continue();
          };
          getReq.onerror = event => {
            console.log(`selectAll fails ${event.target.error}`);
          };
        } catch (error) {
          console.log(error);
          reject(error.message);
        }
      };
    });
  }

  delete(keyValue) {
    return new Promise((resolve, reject) => {
      const req = this.createRequest(this._dbName, this._storeName);
      req.onsuccess = event => {
        const db = event.target.result;
        const trans = db.transaction(this._storeName, "readwrite");
        const store = trans.objectStore(this._storeName);

        try {
          const deleteReq = store.delete(keyValue);

          deleteReq.onsuccess = event => {
            console.log("delete success");
            resolve();
          };

          deleteReq.onerror = event => {
            console.log(`delete fails ${event.target.error}`);
          };
        } catch (error) {
          console.log(error);
          reject(error.message);
        }
      };
    });
  }

  deleteDatabase() {
    return new Promise((resolve, reject) => {
      const deleteReq = indexedDB.deleteDatabase(this._dbName);
      deleteReq.onsuccess = () => {
        console.log("db destroy success");
        resolve();
      };

      deleteReq.onerror = event => {
        console.log(`db delete fail ${event.target.error}`);
      };
    });
  }
}
