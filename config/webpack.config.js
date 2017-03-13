const path = require('path');
const webpack = require('webpack');
const outputPath = path.resolve(__dirname, path.join('..', 'dist', 'js'));

module.exports =  (isDev = false) => {

    const options = {
        entry: {
            app: ['babel-polyfill', './client/js/index.js']

        },
        output: {
            path: outputPath,
            filename: '[name].js'
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: !isDev,
                warnings: isDev
            })
        ],
        watch: isDev,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react', { "modules": false }]
                    }
                }
            ]
        }

    };

    return options;
};