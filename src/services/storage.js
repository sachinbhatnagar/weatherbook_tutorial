const adapter = window.localStorage;

class Storage {
  constructor() {
    if (!adapter["weatherbook"]) {
      adapter["weatherbook"] = "[]";
    }
    this.db = JSON.parse(adapter.getItem("weatherbook"));
  }
  doesLocationExist(location) {
    return this.db.findIndex(l => l.place === location) === -1 ? false : true;
  }
  storeLocation(location) {
    if (!this.doesLocationExist(location)) {
      this.db.push({
        id: new Date().getTime(),
        place: location
      });
      this.updateStore();
    }
  }
  updateStore() {
    adapter.setItem("weatherbook", JSON.stringify(this.db));
  }
  getLocations() {
    return this.db;
  }
  deleteLocation(location) {
    const update = this.db.filter(l => l.place !== location);
    this.db = update;
    this.updateStore();
  }
}

export default new Storage();
