# revue

[![NPM version](https://img.shields.io/npm/v/revue.svg?style=flat)](https://npmjs.com/package/revue) [![NPM downloads](https://img.shields.io/npm/dm/revue.svg?style=flat)](https://npmjs.com/package/revue) [![CircleCI](https://circleci.com/gh/egoist/revue/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/revue/tree/master)

Refined state containter for Vue.js

## Install

```bash
yarn add revue
```

CDN: [UNPKG](https://unpkg.com/revue/) | [jsDelivr](https://cdn.jsdelivr.net/npm/revue/) (available as `window.Revue`)

## Usage

Create a `store` first:

```js
import Vue from 'vue'
import Revue, { createStore } from 'revue'

Vue.use(Revue)

const store = createStore({
  state: { count: 0 },
  mutations: {
    increment: state => state.count++
  }
})

new Vue({
  store,
  render: h => h(App)
})
```

Then create your `App`:

```js
import { connect, state, mutation } from 'revue'

// A "stateless" component
const Counter = {
  props: ['count', 'increment'],
  template: `<button @click="incremnt">{{ count }}</button>`
}

// Connect needed state and mutations to `Counter`
const App = {
  template: '<counter />',
  components: {
    Counter: connect({
      count: state(),
      increment: mutation()
    }, Counter)
  }
}

export default App
```

## License

MIT &copy; [EGOIST](https://github.com/egoist)
