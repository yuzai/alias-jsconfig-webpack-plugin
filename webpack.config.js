const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const test = require('./webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            'src': path.join(__dirname, 'src'),
            '$config': path.join(__dirname, 'src/config'),
            'utils': path.join(__dirname, 'src/utils'),
            'images': path.join(__dirname, 'src/images'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'custom-plugin',
        }),
        new CleanWebpackPlugin(),
        new test({
            msg: 'test plugin3',
        }),
    ]
}