var merge = require('webpack-merge'),
    webpack = require('webpack');

var baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
});