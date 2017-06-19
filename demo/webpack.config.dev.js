/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var webpackBaseConfig = require('./webpack.config.base');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Set up dev host and HMR host. For the dev host this is pretty self
// explanatory: We use a different live-reload server to serve our static JS
// files in dev, so we need to be able to actually point a script tag to that
// host so it can load the right files. The HMR host is a bit stranger. For more
// details on why we need this URL see the readme and:
// https://github.com/glenjamin/webpack-hot-middleware/issues/37
var DEV_PORT = process.env.DEV_PORT || 3002;
var DEV_HOST = `//localhost:${DEV_PORT}/`;

module.exports = Object.assign(webpackBaseConfig, {
  devtool: 'inline-source-map',

  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join(__dirname, 'client', 'index.js'),
    ],
  },

  module: {
    rules: webpackBaseConfig.module.rules.concat(
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /node_modules/
      }
    )
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: DEV_HOST,
  },

  plugins: [
    new ExtractTextPlugin({ filename: 'css/bundle.css', disable: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
