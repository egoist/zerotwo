<template>
  <div id="app">
    <button @click="increment">{{ count }}:{{ doubleCount }}</button>
  </div>
</template>

<script>
export default {
  props: ['count', 'increment', 'doubleCount']
}
</script>
