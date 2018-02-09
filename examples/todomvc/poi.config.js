const path = require('path')

module.exports = {
  entry: 'src/index.js',
  html: {
    template: 'index.html'
  },
  webpack: {
    resolve: {
      alias: {
        zerotwo$: path.join(__dirname, '../../src/index.js')
      }
    }
  }
}
