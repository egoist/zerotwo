import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { zerotwo, store, computed } from './'

Vue.use(zerotwo)

test('it works', async () => {
  @store
  class Store {
    state = { count: 0 }

    increment = () => this.state.count++

    @computed get doubleCount() {
      return this.state.count * 2
    }
  }

  const wrapper = mount({
    store: Store,
    render() {
      return <button onClick={this.$store.increment}>
        {this.$store.state.count}:{this.$store.doubleCount}
      </button>
    }
  })
  expect(wrapper.text()).toBe('0:0')
  wrapper.find('button').trigger('click')
  await Vue.nextTick()
  expect(wrapper.text()).toBe('1:2')
})
