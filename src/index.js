import Vue from 'vue'
import assign from 'nano-assign'

const exists = (obj, key) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    Object.prototype.hasOwnProperty.call(obj, key)
  ) {
    console.error(`[zerotwo] ${key} already exists on the store:`, obj[key])
    return true
  }
  return false
}

const createVm = opts => {
  const silent = Vue.config.silent
  Vue.config.silent = true
  const vm = new Vue(opts)
  Vue.config.silent = silent
  return vm
}

const shallowClone = obj => {
  const clone = Object.create(Object.getPrototypeOf(obj))

  const props = Object.getOwnPropertyNames(obj)
  props.forEach(key => {
    const desc = Object.getOwnPropertyDescriptor(obj, key)
    Object.defineProperty(clone, key, desc)
  })

  return clone
}

export default function zerotwo({ state, actions, views }) {
  return newState => {
    const finalState = assign(
      {},
      typeof state === 'function' ? state() : state,
      newState
    )
    const subscribers = []
    const computed = Object.create(null)
    const methods = Object.create(null)

    const stateVm = createVm({ data: { state: finalState } })
    const reactiveStore = shallowClone(stateVm.state)
    reactiveStore.subscribe = fn => subscribers.push(fn)
    reactiveStore.getSnapshot = () => JSON.parse(JSON.stringify(stateVm.state))
    reactiveStore.restoreSnapshot = newState => {
      let finalState = newState || state
      if (typeof finalState === 'function') {
        finalState = finalState()
      }
      for (const k in finalState) {
        reactiveStore[k] = finalState[k]
      }
    }
    reactiveStore.$stateVm = stateVm

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
    const vm = createVm({
      computed,
      methods
    })
    reactiveStore.$viewsVm = vm

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
