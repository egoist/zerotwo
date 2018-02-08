import Vue from 'vue'
import assign from 'nano-assign'

export default function Revue(Vue) {
  Vue.mixin({
    beforeCreate() {
      const store = this.$options.store || (this.$parent && this.$parent.$store)
      if (store) {
        this.$store = store
      }
    }
  })
}

export const createStore = ({ state, mutations, getters }) => {
  const getterKeys = getters && Object.keys(getters)
  const wrappedGetters = {}
  if (getterKeys) {
    for (const key of getterKeys) {
      wrappedGetters[key] = function() {
        return getters[key](this._data.$$state, wrappedGetters)
      }
    }
  }

  const vm = new Vue({
    data: {
      $$state: state
    },
    computed: wrappedGetters
  })
  const store = {
    vm,
    getters: {},
    get state() {
      return vm._data.$$state
    },
    set state(v) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Please do not directly mutation store state.')
      }
    },
    commit(name, payload) {
      const mutation = mutations[name]
      return mutation(vm._data.$$state, payload)
    },
    dispatch(name, payload) {
      const action = actions[name]
      return Promise.resolve(action(this, payload))
    }
  }

  if (getterKeys) {
    for (const key of getterKeys) {
      Object.defineProperty(store.getters, key, {
        get: () => vm[key],
        enumerable: true
      })
    }
  }

  return store
}

const STATE = 'STATE'
const MUTATION = 'MUTATION'
const ACTION = 'ACTION'
const GETTER = 'GETTER'

const getPropsFromStore = (store, obj) => {
  return Object.keys(obj).reduce((res, key) => {
    const def = obj[key]
    const name = def.name || key
    let value

    if (def.type === STATE) {
      value = store.state[name]
    } else if (def.type === MUTATION) {
      value = payload => store.commit(name, payload)
    } else if (def.type === ACTION) {
      value = payload => store.dispatch(name, payload)
    } else if (def.type === GETTER) {
      value = store.getters[name]
    }
    res[name] = value
    return res
  }, {})
}

export const connect = (obj = {}, Comp) => {
  return {
    functional: true,
    name: `connect-${Comp.name || 'unknown'}`,
    props: Comp.props,
    render(h, ctx) {
      const store = ctx.parent.$store
      if (process.env.NODE_ENV !== 'production' && !store) {
        console.error('You need to `Vue.use(Revue)` first!')
      }
      const props = assign({}, ctx.props, getPropsFromStore(store, obj))
      return h(
        Comp,
        {
          data: ctx.data,
          props
        },
        ctx.children
      )
    }
  }
}

export const state = name => ({
  type: STATE,
  name
})

export const mutation = name => ({
  type: MUTATION,
  name
})

export const action = name => ({
  type: ACTION,
  name
})

export const getter = name => ({
  type: GETTER,
  name
})
