class StoreManager {
  constructor(storeName) {
    this.storeName = storeName;
    this.state = [];
  }

  findIndex(id) {
    return this.state.findIndex((item) => item.id === id);
  }

  getAll() {
    return [...this.state];
  }

  add(item) {
    this.state.push(item);
  }

  delete(item) {
    const i = this.findIndex(item.id);

    if (i === -1) {
      console.error("item not found");
      return;
    }

    this.state.splice(i, 1);
  }
}

export default StoreManager;