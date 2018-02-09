import { connect, mutation } from 'zerotwo'
import Todo from './Todo.vue'

export default connect({
  editTodo: mutation(),
  toggleTodo: mutation(),
  deleteTodo: mutation()
}, Todo)
