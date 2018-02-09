import { connect, mutation } from 'zerotwo'
import App from './App.vue'

export default connect({
  addTodo: mutation(),
  clearCompleted: mutation(),
  toggleAll: mutation()
})(App)
