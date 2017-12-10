var path = require('path'),
    merge = require('webpack-merge'),
    webpack = require('webpack');

var baseConfig = require('./base.config');

var root = path.resolve(__dirname, '..');

module.exports = merge(baseConfig, {
    entry: [
        'webpack/hot/dev-server',
        path.join(root, 'src/index.js')
    ],
    devServer: {
        historyApiFallback: true,
        inline: true,
        progress: true,
        port: 3000
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
})