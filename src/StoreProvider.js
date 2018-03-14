const Provider = {
  name: 'StoreProvider',
  props: {
    inject: {
      type: Array,
      required: true
    }
  },
  provide() {
    return {
      storeInjects: this.inject.map(Store => new Store().init())
    }
  },
  render() {
    return this.$slots.default[0]
  }
}

export default Provider
