
# zerotwo

[![NPM version](https://img.shields.io/npm/v/zerotwo.svg?style=flat)](https://npmjs.com/package/zerotwo) [![NPM downloads](https://img.shields.io/npm/dm/zerotwo.svg?style=flat)](https://npmjs.com/package/zerotwo) [![CircleCI](https://circleci.com/gh/egoist/zerotwo/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/zerotwo/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

Partially inspired by mobx-state-tree and unistore.

## Install

```bash
yarn add zerotwo
```

## Usage

[![Edit example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/egoist/zerotwo/tree/master/example)

```js
import Vue from 'vue'
import zerotwo, { BindStore } from 'zerotwo'

const CounterStore = zerotwo({
  state: {
    count: 0
  },
  actions: store => ({
    increment() {
      store.count++
    },
    incrementAsync() {
      setTimeout(() => {
        store.increment()
      })
    }
  })
})

// Allow to bind `store` instance to `this.$store`
Vue.use(BindStore)

new Vue({
  store: CounterStore(),
  template: `<button @click="$store.increment">
    {{$store.count}}
  </button>`
})
```

`BindStore` is unnecessary if you don't want to access `this.$store`.

## Concepts

__state__

Just the _state_ you know.

__actions__

A function that returns a list of actions, the first argument is the store instance.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**zerotwo** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/zerotwo/contributors)).

> [github.com/egoist](https://github.com/egoist) · GitHub [@egoist](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
