let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')
let CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require("webpack-merge")

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/template.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public',
        to: ''
      }]
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
})
