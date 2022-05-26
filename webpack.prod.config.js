let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')
const {merge} = require("webpack-merge")

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: false,
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'bundle.[hash:8].js',
        publicPath: '/'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
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
