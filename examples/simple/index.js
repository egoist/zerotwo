import Vue from 'vue'
import zerotwo, { store, computed } from '../../src'
import App from './App.vue'

Vue.use(zerotwo)

@store
class MyStore {
  state = {
    count: 0
  }

  increment = () => this.state.count++

  @computed
  doubleCount() {
    return Date.now()
  }

  random() {
    this.doubleCount
  }
}

new Vue({
  el: '#app',
  store: MyStore,
  render: h => h(App)
})
