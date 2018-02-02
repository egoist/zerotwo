import Vue from 'vue'
import zerotwo, { BindStore } from 'zerotwo'

Vue.use(BindStore)

const TodoStore = zerotwo({
  state: () => ({
    todos: []
  }),
  actions: self => {
    return {
      addTodo: text => self.todos.push({ text, id: Date.now(), completed: false }),
      removeTodo: id => self.todos = self.todos.filter(todo => todo.id !== id),
      completeTodo: id => self.todos = self.todos.map(todo => {
        if (todo.id === id) todo.completed = !todo.completed
        return todo
      }),
      reset: () => self.restoreSnapshot()
    }
  },
  views: self => ({
    get completeCount() {
      return self.todos.filter(todo => todo.completed).length
    }
  })
})

export default TodoStore()
