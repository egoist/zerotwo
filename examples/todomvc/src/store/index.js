import Vue from 'vue'
import zerotwo, { createStore } from 'zerotwo'
import { state, mutations } from './mutations'
import plugins from './plugins'

Vue.use(zerotwo)

export default createStore({
  state,
  mutations,
  plugins
})
