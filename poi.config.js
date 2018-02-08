const path = require('path')

module.exports = {
  entry: 'example/index.js',
  dist: 'example/dist',
  homepage: './',
  webpack: {
    resolve: {
      alias: {
        zerotwo$: path.resolve('src/index.js')
      }
    }
  }
}
