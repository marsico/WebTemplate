const path = require('path');

const outputPath = path.join('dist', 'js');

module.exports = {
    entry: {
        app: ['babel-polyfill', './client/js/index.js']

    },
    output: {
        path: 'dist/js',
        filename: '[name].js'
    },
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }
    ]
};