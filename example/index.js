import Vue from 'vue'
import zerotwo, { BindStore } from '../src'

const CounterStore = zerotwo({
  state: {
    count: 0
  },
  actions: state => ({
    increment() {
      state.count++
    },
    incrementAsync() {
      setTimeout(() => {
        state.increment()
      })
    }
  })
})

// Allow to bind `store` instance to `this.$store`
Vue.use(BindStore)

new Vue({
  el: '#app',
  store: CounterStore(),
  render() {
    return <button onClick={this.$store.incrementAsync}>
      {this.$store.count}
    </button>
  }
})
