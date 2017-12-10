var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var root = path.resolve(__dirname, '..');

module.exports = {
    entry: path.join(root, 'src/index.js'),
    output: {
        path: path.join(root, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            components: path.join(root, 'src/components'),
            styles: path.join(root, 'src/styles'),
            scripts: path.join(root, 'src/scripts'),
            views: path.join(root, 'src/views')
        },
        extensions: ['*', '.js', '.vue']
    },
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
            { test: /\.(png|jpg|gif)$/, use: 'url-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(root, 'src/index.html'),
            inject: 'body'
        }),
        new ExtractTextPlugin('style.css')
    ]
}