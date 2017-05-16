// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';

class LocalStorageMock {
  constructor() {
    this.store = new Map();
  }

  clear() {
    this.store = new Map();
  }

  getItem(key) {
    return this.store.get(key);
  }

  setItem(key, value) {
    this.store.set(key, value);
  }

  removeItem(key) {
    this.store.delete(key);
  }
}

global.localStorage = new LocalStorageMock();
