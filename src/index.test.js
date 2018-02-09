import Vue from 'vue'
import { mount } from '@vue/test-utils'
import zerotwo, { createStore, connect, getter, state, action } from './'

Vue.use(zerotwo)

test('it works', async () => {
  const Child = {
    name: 'child',
    props: ['count', 'doubleCount', 'incAsync'],
    render() {
      return <button onClick={this.incAsync}>
        {this.count}:{this.doubleCount}
      </button>
    }
  }
  const ConnectChild = connect({
    count: state(),
    doubleCount: getter(),
    incAsync: action()
  }, Child)
  const wrapper = mount({
    store: createStore({
      state: {
        count: 0
      },
      mutations: {
        increment: state => state.count++
      },
      actions: {
        incAsync: ({ commit }) => commit('increment')
      },
      getters: {
        doubleCount: state => state.count * 2
      }
    }),
    render() {
      return <ConnectChild />
    }
  })
  expect(wrapper.text()).toBe('0:0')
  wrapper.find('button').trigger('click')
  await Vue.nextTick()
  expect(wrapper.text()).toBe('1:2')
})
