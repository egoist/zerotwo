import { connect, state, mutation, getter } from 'revue'
import App from './App.vue'

export default connect({
  count: state('count'),
  increment: mutation('increment'),
  doubleCount: getter()
}, App)
