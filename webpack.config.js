const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './views/index.js'],
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};
