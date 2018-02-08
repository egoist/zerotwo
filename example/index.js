import Vue from 'vue'
import zerotwo, { createStore, devtool } from 'zerotwo'
import App from './App'

Vue.use(zerotwo)

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
  },
  plugins: [
    devtool
  ]
})

new Vue({
  store,
  el: '#app',
  render() {
    return <App />
  }
})
