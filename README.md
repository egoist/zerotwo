<p align="center">
<img src="https://user-images.githubusercontent.com/8784712/35713736-f3bbe048-0803-11e8-9004-3bce870fb189.png" alt="logo">
</p>


<p align="center"><a href="https://npmjs.com/package/zerotwo"><img src="https://img.shields.io/npm/v/zerotwo.svg?style=flat" alt="NPM version"></a> <a href="https://npmjs.com/package/zerotwo"><img src="https://img.shields.io/npm/dm/zerotwo.svg?style=flat" alt="NPM downloads"></a> <a href="https://circleci.com/gh/egoist/zerotwo/tree/master"><img src="https://circleci.com/gh/egoist/zerotwo/tree/master.svg?style=shield" alt="CircleCI"></a>  <a href="https://github.com/egoist/donate"><img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat" alt="donate"></a> <a href="https://chat.egoist.moe"><img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat" alt="chat"></a></p>


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
