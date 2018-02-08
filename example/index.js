import Vue from 'vue'
import Revue, { createStore } from 'revue'
import App from './App'

Vue.use(Revue)

const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
})

new Vue({
  store,
  el: '#app',
  render() {
    return <App />
  }
})
