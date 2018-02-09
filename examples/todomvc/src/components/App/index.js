import { connect, mutation, state } from 'zerotwo'
import App from './App.vue'

export default connect({
  todos: state(),
  addTodo: mutation(),
  clearCompleted: mutation(),
  toggleAll: mutation()
})(App)
