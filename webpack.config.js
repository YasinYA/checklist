const webpack = require('webpack');
const path = require('path');

const debug = process.env.NODE_ENV !== "production";

let config = {
    srcPath: path.resolve(__dirname, 'public/src'),
    distPath: path.resolve(__dirname, 'public/dist'),
}

module.export = {
    context: config.srcPath,
    entry: './index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|lib)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: config.distPath
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};
