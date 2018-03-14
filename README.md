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

Use the `zerotwo` plugin first:

```js
import Vue from 'vue'
import { zerotwo } from 'zerotwo'
import App from './App.vue'

// This allows injecting `store` 
// And creating an instance as `$store`
Vue.use(zerotwo)

new Vue({
  render: h => h(App)
})
```

Then create and use the `store` in `App.vue`:

```vue
<template>
  <div>
    <button @click="$store.increment">
      {{ $store.state.count }} or double {{ $store.doubleCount }}
    </button>
  </div>
</template>

<script>
import { Store, computed, action } from 'zerotwo'

class CounterStore extends Store {
  // this.state is automatically converted to reactive data
  // Just like `data` in Vue component
  state = { count: 0 }

  // Tell us it's an action so we can properly track it
  // Mainly for better developer experience
  @action increment = () => this.state.count++

  // `computed getter`
  // Just like `computed` in Vue component
  @computed get doubleCount() {
    return this.state.count * 2
  }
}

export default {
  store: CounterStore
}
</script>
```

## License

MIT &copy; [EGOIST](https://github.com/egoist)
