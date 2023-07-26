export default class LocalStorageAPI {
  getItems(key) {
    const data = localStorage.getItem(key);

    return JSON.parse(data);
  }

  setItems(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
