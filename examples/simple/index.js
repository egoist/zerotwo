import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  el: '#app',
  render() {
    return <store-provider inject={[store]}>
      <App/>
    </store-provider>
  }
})
