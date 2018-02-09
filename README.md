<p align="center">
<img src="https://user-images.githubusercontent.com/8784712/36010988-48ee5e8e-0d8f-11e8-96bf-08e799d94734.png" alt="logo" width="600">
</p>


<p align="center"><a href="https://npmjs.com/package/zerotwo"><img src="https://img.shields.io/npm/v/zerotwo.svg?style=flat" alt="NPM version"></a> <a href="https://npmjs.com/package/zerotwo"><img src="https://img.shields.io/npm/dm/zerotwo.svg?style=flat" alt="NPM downloads"></a> <a href="https://circleci.com/gh/egoist/zerotwo/tree/master"><img src="https://circleci.com/gh/egoist/zerotwo/tree/master.svg?style=shield" alt="CircleCI"></a>  <a href="https://github.com/egoist/donate"><img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat" alt="donate"></a> <a href="https://chat.egoist.moe"><img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat" alt="chat"></a></p>

## Install

```bash
yarn add zerotwo
```

CDN: [UNPKG](https://unpkg.com/zerotwo/) | [jsDelivr](https://cdn.jsdelivr.net/npm/zerotwo/) (available as `window.zerotwo`)

## Usage

[![Edit egoist/zerotwo: todomvc](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/egoist/zerotwo/tree/master/examples/todomvc)

Create a `store` first:

```js
import Vue from 'vue'
import zerotwo, { createStore } from 'zerotwo'

Vue.use(zerotwo)

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
import { connect, state, mutation } from 'zerotwo'

// A "stateless" component
const Counter = {
  props: ['count', 'increment'],
  template: `<button @click="increment">{{ count }}</button>`
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

It's almost the same as `Vuex` but here's no `mapState` `mapMutations` etc.. Instead you use `connect` to feed any needed data to your component as props.

### connect

```js
import { state, getter, action, mutation } from 'zerotwo'

connect({
  count: state(),
  doubleCount: getter(),
  increment: mutation(),
  incrementAsync: action()
})

// To connect from a different name
// Just pass the name to the connect helpers like:
connect({
  // state.thatCount -> this.count
  count: state('thatCount')
})
```

### createStore({ state, mutations, actions, getters, plugins })

#### state

Type: `Function | object`

Initial state.

#### mutations

Type: `{ [type: string]: Function }`

Mutation handlers.

#### actions

Type: `{ [type: string]: Function }`

Action handlers.

#### getters

Type: `{ [key: string]: Function }`

Register getters on the store. The getter function receives the following arguments:

```js
state,
getters
```

#### plugins

Type: `Array<Function>`

An array of plugin functions to be applied to the store. The plugin simply receives the store as the only argument and can either listen to mutations (for outbound data persistence, logging, or debugging) or dispatch mutations (for inbound data e.g. websockets or observables).

### store

#### store.commit(mutation, payload)

#### store.dispatch(action, payload)

#### store.replaceState(newState)

## License

MIT &copy; [EGOIST](https://github.com/egoist)
