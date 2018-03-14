import Vue from 'vue'
import { zerotwo, Store, computed, decorate, action } from '../../src'

Vue.use(zerotwo)

class MyStore extends Store {
  state = {
    count: 0
  }

  constructor() {
    super()
    this.subscribe((state, action, payload) => {
      console.log(state, action, payload)
    })
  }

  @action increment = () => this.state.count++

  get doubleCount() {
    return this.state.count * 2
  }
}

decorate(MyStore, {
  doubleCount: computed
})

export default MyStore
