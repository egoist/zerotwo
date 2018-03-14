import Vue from 'vue'

const getStoreFromOption = Store => new Store()._init()

function zerotwo(Vue) {
  Vue.mixin({
    beforeCreate() {
      const store = this.$options.store && getStoreFromOption(this.$options.store)
      if (store) {
        this.$store = store
      }
    }
  })
}

function store(Store) {
  Store.prototype._init = function () {
    const silent = Vue.config.silent
    Vue.config.silent = true
    this._vm = new Vue({
      data: this.state,
      computed: this._computed,
      __store: this
    })
    Vue.config.silent = silent
    return this
  }
}

function computed(target, key, desc) {
  target._computed = target._computed || {}
  if (process.env.NODE_ENV !== 'production' && !desc.get) {
    throw new Error(`Computed value for ${key} must be a getter! i.e. @computed get ${key}() {}`)
  }
  Object.defineProperty(target._computed, key, {
    value() {
      return desc.get.call(this.$options.__store)
    },
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

export {
  zerotwo,
  store,
  computed
}
