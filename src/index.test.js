import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { zerotwo, Store, action, computed } from './'

Vue.use(zerotwo)

test('it works', async () => {
  class MyStore extends Store {
    state = { count: 0 }

    @action increment = () => this.state.count++

    @computed get doubleCount() {
      return this.state.count * 2
    }
  }

  const wrapper = mount({
    store: MyStore,
    template: `
    <button @click="$store.increment">
      {{$store.state.count}}:{{$store.doubleCount}}
    </button>
    `
  })
  expect(wrapper.text()).toBe('0:0')
  wrapper.find('button').trigger('click')
  await Vue.nextTick()
  expect(wrapper.text()).toBe('1:2')
})
