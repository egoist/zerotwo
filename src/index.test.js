import Vue from 'vue'
import { mount } from 'vue-test-utils'
import Revue, { createStore, connect, getter, state, mutation } from './'

Vue.use(Revue)

test('it works', async () => {
  const Child = {
    name: 'child',
    props: ['count', 'doubleCount', 'increment'],
    render() {
      return <button onClick={this.increment}>
        {this.count}:{this.doubleCount}
      </button>
    }
  }
  const ConnectChild = connect({
    count: state(),
    doubleCount: getter(),
    increment: mutation()
  }, Child)
  const wrapper = mount({
    store: createStore({
      state: {
        count: 0
      },
      mutations: {
        increment: state => state.count++
      },
      getters: {
        doubleCount: state => state.count * 2
      }
    }),
    render() {
      return <ConnectChild />
    },
  })
  expect(wrapper.text()).toBe('0:0')
  wrapper.find('button').trigger('click')
  await Vue.nextTick()
  expect(wrapper.text()).toBe('1:2')
})
