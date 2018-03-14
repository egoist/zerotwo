<template>
  <div id="app">
    <button @click="$store.increment">
      {{ $store.state.count }} and {{ $store.doubleCount }}
    </button>
  </div>
</template>

<script>
import store from './store'

export default {
  store
}
</script>
