import Vue from 'vue'
import { zerotwo, reactive, computed, decorate } from '../../src'

Vue.use(zerotwo)

@reactive
class MyStore {
  state = {
    count: 0
  }

  increment = () => this.state.count++

  get doubleCount() {
    return this.state.count * 2
  }
}

decorate(MyStore, {
  doubleCount: computed
})

export default MyStore
