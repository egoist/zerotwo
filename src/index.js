import Vue from 'vue'
import StoreConsumer from './StoreConsumer'

const getStoreFromOption = Store => new Store()._init()

function zerotwo(Vue) {
  Vue.mixin({
    beforeCreate() {
      const store = this.$options.store ? getStoreFromOption(this.$options.store) : (this.$parent && this.$parent.$store)
      if (store) {
        this.$store = store
      }
    }
  })

  Vue.component(StoreConsumer.name, StoreConsumer)
}

function store(Store) {
  Store.prototype._init = function () {
    const silent = Vue.config.silent
    Vue.config.silent = true
    this._vm = new Vue({
      data: this.state,
      computed: this._computed
    })
    Vue.config.silent = silent
    return this
  }
}

function computed(target, key, desc) {
  target._computed = target._computed || {}
  Object.defineProperty(target._computed, key, {
    value: desc.value,
    configurable: true,
    enumerable: true
  })
  return {
    configurable: true,
    enumerable: true,
    get() {
      return this._vm[key]
    }
  }
}

export default zerotwo
export {
  store,
  StoreConsumer,
  computed
}
