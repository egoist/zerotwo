<template>
  <div id="app">
    <store-consumer>
      <button slot-scope="store" @click="store.increment">
        {{ store.state.count }} and {{ store.doubleCount }}
      </button>
    </store-consumer>
  </div>
</template>
