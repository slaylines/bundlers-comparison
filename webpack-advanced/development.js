const webpack = require('webpack');
const path = require('path');
const root = path.resolve(__dirname, '..');

const cacheDir = path.resolve(__dirname, '..', 'node_modules', '.cache');

const getThreadLoader = name => ({
    loader: 'thread-loader',
    options: {
        workerParallelJobs: 50,
        poolRespawn: false,
        name
    }
});

module.exports = {
  mode: 'development',
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
          use: [
              {
                  loader: 'cache-loader',
                  options: {
                      cacheDirectory: path.resolve(cacheDir, 'js')
                  }
              },
              getThreadLoader('js'),
              {
                  loader: 'babel-loader',
                  options: {
                      cacheDirectory: path.resolve(cacheDir, 'babel')
                  }
              }
          ]
      },
      {
        test: /\.scss$/,
          use: [
              {
                  loader: 'cache-loader',
                  options: {
                      cacheDirectory: path.resolve(cacheDir, 'css')
                  }
              },
              getThreadLoader('css'),
              'style-loader',
              'css-loader',
              'sass-loader'
          ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ],
  devServer: {
    contentBase: path.resolve(root, 'dist', 'webpack'),
    publicPath: '/',
    compress: true,
    hot: true,
    historyApiFallback: true,
    open: true
  },
  // devtool: 'source-map'
  devtool: process.env.npm_config_sourcemaps ? 'inline-source-map' : 'inline-eval',
};
