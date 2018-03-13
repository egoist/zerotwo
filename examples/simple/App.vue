<template>
  <div id="app">
    <store-consumer>
      <div slot-scope="store">
        <button @click="store.increment">
          {{ store.state.count }} and {{ store.doubleCount }}
        </button>
      </div>
    </store-consumer>
  </div>
</template>
