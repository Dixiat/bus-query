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
            views: path.join(root, 'src/views'),
            images: path.join(root, 'src/images')
        },
        extensions: ['*', '.js', '.vue'],
        modules: [path.resolve(__dirname, '../node_modules')]
    },
    module: {
        rules: [
            { test: /\.vue$/, use: { loader: 'vue-loader', options: { loaders: { css: ExtractTextPlugin.extract({ use: 'css-loader' }) } } } },
            { test: /\.js$/, use: 'babel-loader', include: [path.join(root, 'src')] },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
            { test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' },
            { test: /\.(png|jpe?g|gif)$/, use: { loader: 'url-loader', options: { limit: 10000, name: 'images/[name]:[hash:7].[ext]' } } }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),        
        new HtmlWebpackPlugin({
            template: path.join(root, 'src/index.html'),
            inject: 'body'
        }),
        new ExtractTextPlugin('css/style.css')
    ]
}