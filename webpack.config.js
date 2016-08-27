var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: __dirname + "/public/javascripts",
    entry: './index.js',
    output: {
        path: './public',
        filename: 'bundle.js',
        publicpath: '/public/'
    },
    module: {
            loaders: [
                        {
                                test: /\.js$/,
                                exlcude: /node_modules/,
                                loader: 'babel-loader'
                        },
                    ]
    },
    plugins: [
                new webpack.ProvidePlugin({
                    "React": "react"
                })
            ]
};
