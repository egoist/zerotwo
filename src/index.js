import Vue from 'vue'
import StoreConsumer from './StoreConsumer'
import StoreProvider from './StoreProvider'

const getStoreFromOption = Store => new Store().init()

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
  Vue.component(StoreProvider.name, StoreProvider)
}

class Store {
  constructor() {
    this._listeners = []
  }

  subscribe(fn) {
    this._listeners.push(fn)
    return this
  }

  init() {
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

  emit(...args) {
    this._listeners.forEach(fn => fn(this.state, ...args))
    return this
  }
}

// TODO: we should only allow calling class method that is an action
function action(target, key, desc) {
  return {
    configurable: true,
    enumerable: true,
    get() {
      const value = (...payload) => {
        this.emit(key, ...payload)
        const fn = desc.value || desc.initializer.call(this)
        return fn(...payload)
      }
      return value
    },
    set() {
      throw new Error(`You should not assign new value to ${key}`)
    }
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

function decorate(Store, obj) {
  // eslint-disable-next-line guard-for-in
  for (const prop in obj) {
    const decorator = obj[prop]
    const desc = Object.getOwnPropertyDescriptor(Store.prototype, prop)
    Object.defineProperty(Store.prototype, prop, decorator(Store.prototype, prop, desc) || desc)
  }
}

export {
  zerotwo,
  computed,
  StoreProvider,
  StoreConsumer,
  Store,
  action,
  decorate
}
