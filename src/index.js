import Vue from 'vue'
import assign from 'nano-assign'

const exists = (obj, key) => {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    console.error(`[zerotwo] ${key} already exists on the store:`, obj[key])
    return true
  }
  return false
}

export default function zerotwo({ state, actions, views }) {
  return newState => {
    const subscribers = []
    const computed = Object.create(null)
    const methods = Object.create(null)
    const reactiveStore = {}

    if (newState) {
      state = assign({}, state, newState)
    }
    for (const key in state) {
      Vue.util.defineReactive(reactiveStore, key, state[key])
    }

    if (views) {
      const boundViews = views(reactiveStore)
      for (const key in boundViews) {
        const desc = Object.getOwnPropertyDescriptor(boundViews, key)
        if (desc.get) {
          computed[key] = desc.get.bind(computed)
        } else if (desc.value) {
          methods[key] = desc.value.bind(methods)
        }
      }
    }
    const silent = Vue.config.silent
    Vue.config.silent = true
    const vm = new Vue({
      computed,
      methods
    })
    Vue.config.silent = silent

    for (const key in computed) {
      if (!exists(reactiveStore, key)) {
        Object.defineProperty(reactiveStore, key, {
          get: () => vm[key],
          enumerable: true
        })
      }
    }
    for (const key in methods) {
      if (!exists(reactiveStore, key)) {
        reactiveStore[key] = methods[key]
      }
    }

    if (actions) {
      const boundActions = actions(reactiveStore)
      for (const key in boundActions) {
        if (!exists(reactiveStore, key)) {
          const action = boundActions[key]
          reactiveStore[key] = (...args) => {
            action(...args)
            subscribers.forEach(sub => sub(key, ...args))
          }
        }
      }
    }

    reactiveStore.subscribe = fn => subscribers.push(fn)

    return reactiveStore
  }
}

export const BindStore = Vue => {
  Vue.mixin({
    beforeCreate() {
      this.$store = this.$options.store || (this.$parent && this.$parent.$store)
    }
  })
}
