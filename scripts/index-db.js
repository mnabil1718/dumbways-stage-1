class IndexedDBStore {
  constructor(dbName, storeName, versionNumber = 1) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.versionNumber = versionNumber;
    this.db = null;
  }

  open() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.versionNumber);
      request.onerror = (e) => reject(e.target.error);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "id" });
          // TODO: create index if necessary
        }
      };
      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };
    });
  }

  _catch(e) {
    console.error(e);
  }

  _trx(mode = "readonly") {
    return this.db.transaction([this.storeName], mode).objectStore(this.storeName);
  };

  getAll() {
    return new Promise((resolve, reject) => {
      const store = this._trx("readonly");
      const request = store.getAll();
      request.onerror = () => this._catch(request.error); // the caller will see Promise is resolved, not waiting
      request.onsuccess = () => resolve(request.result);
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      const store = this._trx("readonly");
      const request = store.get(id);
      request.onerror = () => this._catch(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  add(item) {
    return new Promise((resolve, reject) => {
      const store = this._trx("readwrite");
      const request = store.add(item);
      request.onerror = () => this._catch(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  update(item) {
    return new Promise((resolve, reject) => {
      const store = this._trx("readwrite");
      const request = store.put(item);
      request.onerror = () => this._catch(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const store = this._trx("readwrite");
      const request = store.delete(id);
      request.onerror = () => this._catch(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }


}

export default IndexedDBStore;