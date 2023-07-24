export default class LocalStorageAPI {
  getItems(key) {
    const data = JSON.parse(localStorage.getItem(key));

    if (!data) {
      this.setItems(key, []);
      return [];
    }

    return data;
  }

  setItems(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
