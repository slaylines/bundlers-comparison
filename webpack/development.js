const webpack = require('webpack');
const path = require('path');
const root = path.resolve(__dirname, '..');

module.exports = {
  mode: 'development',
  context: root,
  entry: {
    main: path.resolve(root, 'app', 'src', 'index.js')
  },
  resolve: {
    modules: [path.resolve(root, 'node_modules')],
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(root, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ],
  devServer: {
    contentBase: path.resolve(root, 'dist'),
    publicPath: '/',
    compress: true,
    hot: true,
    historyApiFallback: true
  },
  devtool: 'source-map'
};
