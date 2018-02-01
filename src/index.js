import Vue from 'vue'

export default function zerotwo({ state, actions }) {
  return () => {
    const reactiveStore = {}
    for (const key in state) {
      Vue.util.defineReactive(reactiveStore, key, state[key])
    }
    if (actions) {
      actions = actions(reactiveStore)
      for (const key in actions) {
        reactiveStore[key] = actions[key]
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
