import Vue from 'vue'
import { zerotwo, store, computed } from '../../src'

Vue.use(zerotwo)

@store
class MyStore {
  state = {
    count: 0
  }

  increment = () => this.state.count++

  @computed
  get doubleCount() {
    return this.state.count * 2
  }
}

export default MyStore
