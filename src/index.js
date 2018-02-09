import Vue from 'vue'
import assign from 'nano-assign'

const unifyObject = (type, payload) => {
  if (typeof type === 'object') return type
  return { type, payload }
}

export default function zerotwo(Vue) {
  Vue.mixin({
    beforeCreate() {
      const store = this.$options.store || (this.$parent && this.$parent.$store)
      if (store) {
        this.$store = store
      }
    }
  })
}

export const createStore = ({ state, mutations, getters, actions, plugins }) => {
  const getterKeys = getters && Object.keys(getters)
  const wrappedGetters = {}
  if (getterKeys) {
    for (const key of getterKeys) {
      wrappedGetters[key] = function () {
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

  const subscribers = []
  const store = {
    vm,
    committing: false,
    getters: {},
    get state() {
      return vm._data.$$state
    },
    set state(v) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(
          '[zerotwo] Please do not directly mutation store state, use `store.replaceState(newState) instead!`'
        )
      }
    },
    commit(_type, _payload) {
      const mutation = unifyObject(_type, _payload)
      const fn = mutations[mutation.type]
      if (process.env.NODE_ENV !== 'production' && !fn) {
        throw new Error(`[zerotwo] Unknown mutation type: ${mutation.type}`)
      }
      this.withCommit(() => fn(vm._data.$$state, mutation.payload))
      for (const sub of subscribers) {
        sub(mutation, this.state)
      }
    },
    dispatch(_type, _payload) {
      const action = unifyObject(_type, _payload)
      const fn = actions[action.type]
      if (process.env.NODE_ENV !== 'production' && !fn) {
        throw new Error(`[zerotwo] Unknown action type: ${action.type}`)
      }
      return Promise.resolve(fn({
        commit: this.commit.bind(this),
        dispatch: this.dispatch.bind(this),
        state: this.state
      }, action.payload))
    },
    subscribe(sub) {
      subscribers.push(sub)
    },
    replaceState(state) {
      this.withCommit(() => {
        vm._data.$$state = state
      })
    },
    withCommit(fn) {
      const committing = this.committing
      this.committing = true
      fn()
      this.committing = committing
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

  // Strict mode
  if (process.env.NODE_ENV !== 'production') {
    vm.$watch(
      function () {
        return this._data.$$state
      },
      () => {
        if (!store.committing) {
          throw new Error(
            `[zertwo] Do not mutate store state outside mutation handlers.`
          )
        }
      },
      { deep: true, sync: true }
    )
  }

  if (plugins) {
    for (const plugin of plugins) {
      plugin(store)
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
  if (!Comp) return Comp => connect(obj, Comp)

  return {
    functional: true,
    name: `connect-${Comp.name || 'unknown'}`,
    props: Comp.props,
    render(h, ctx) {
      const store = ctx.parent.$store
      if (process.env.NODE_ENV !== 'production' && !store) {
        console.error('You need to `Vue.use(zerotwo)` first!')
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

export { default as devtool } from './devtool'
