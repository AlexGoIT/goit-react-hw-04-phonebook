export default class LocalStorageAPI {
  getItems(key) {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : [];
  }

  setItems(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
