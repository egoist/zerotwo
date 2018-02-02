import Vue from 'vue'
import zerotwo, { BindStore } from 'zerotwo'

const CounterStore = zerotwo({
  state: {
    count: 0,
    noise: 'foo'
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
  }),
  views: state => ({
    get doubleCount() {
      return state.count * 2
    },
    get date() {
      return Date.now()
    },
    d() {
      return Date.now()
    }
  })
})

const store = CounterStore()
store.subscribe((...args) => {
  console.log(args)
})

// Allow to bind `store` instance to `this.$store`
Vue.use(BindStore)

new Vue({
  el: '#app',
  store,
  render() {
    return <button onClick={this.$store.incrementAsync}>
      {this.$store.count}:{this.$store.doubleCount}:{this.$store.date}:{this.$store.d()}
    </button>
  }
})
