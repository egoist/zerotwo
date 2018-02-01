import Vue from 'vue'
import { mount } from '@vue/test-utils'
import zerotwo from './'

test('simple', async () => {
  const store = zerotwo({
    state: {
      count: 0
    },
    actions: state => ({
      inc: () => state.count++
    })
  })()
  const wrapper = mount({
    render(h) {
      return h('button', null, [store.count])
    }
  })
  expect(wrapper.text()).toBe('0')
  store.inc()
  expect(store.count).toBe(1)
  await Vue.nextTick()
  expect(wrapper.text()).toBe('1')
})
