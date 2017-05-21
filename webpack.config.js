const webpack = require('webpack');
const path = require('path');

const debug = process.env.NODE_ENV !== "production";

const config = {
    context: path.join(__dirname, '/public/js/src'),
    entry: [
        './index.js'
    ],
    output: {
        path: path.join(__dirname, '/public/js/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.join(__dirname, '/public/js/src'),
            use: ['babel-loader',]
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
    ]
};

module.exports = config;
