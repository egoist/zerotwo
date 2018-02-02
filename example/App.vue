<template>
  <div id="app">
    <input v-model="text">
    <button @click="addTodo">Add todo</button>
    <ul>
      <li class="todo" v-for="todo in todos" :key="todo.id">
        <label>
          <input type="checkbox" @change="$store.completeTodo(todo.id)" :value="todo.completed">
          {{ todo.text }}
          <button @click="$store.removeTodo(todo.id)">Remove</button>
        </label>
      </li>
    </ul>
    <div v-if="todos.length > 0">
      <hr>
      <button @click="$store.reset">Reset</button>
    </div>
    <hr>
    Completed: {{ $store.completeCount }}
    <hr>
    <pre>{{ JSON.stringify($store.getSnapshot(), null, 2) }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  computed: {
    todos() {
      return this.$store.todos
    }
  },
  methods: {
    addTodo() {
      this.$store.addTodo(this.text)
      this.text = ''
    }
  }
}
</script>

<style scoped>
.todo {
  user-select: none;
}
</style>
