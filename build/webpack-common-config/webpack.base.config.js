const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin')  
const { VueLoaderPlugin } = require('vue-loader');
const config = require('../webpack.config');

const isProd = process.env.NODE_ENV === 'prod';

module.exports = {
  resolve: {
    alias: config.alias
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options:{
          plugins:['syntax-dynamic-import']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader'
      },
      {
        // 用于js import 'item.css';的用法
        test: /\.css$/,
        // 重要：使用 vue-style-loader 替代 style-loader
        use: isProd
        ? ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'vue-style-loader'
          })
        : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'css/[name].[chunkhash].css',
          allChunks: true
        }),
        new DashboardPlugin()
      ]
    : [ new VueLoaderPlugin(), new FriendlyErrorsPlugin() ],
  optimization: {
    minimize: isProd
  },
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : '#cheap-module-source-map'
};
