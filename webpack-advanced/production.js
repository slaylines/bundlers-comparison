const webpack = require('webpack');
const path = require('path');
const root = path.resolve(__dirname, '..');

module.exports = {
  mode: 'production',
  context: root,
  entry: path.resolve(root, 'app', 'src', 'index.js'),
  output: {
    path: path.resolve(root, 'dist', 'webpack'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /\.scss$/,
        use: ['thread-loader', 'style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ]
};
