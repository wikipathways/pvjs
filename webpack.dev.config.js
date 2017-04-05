var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './test/e2e/index.tsx',
    output: {
        path:  path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', 'json']
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader']},
            { test: /\.json$/, use: 'json-loader'},
            { test: /\.ts(x?)$/, use: 'ts-loader' },
            {
                test: /\.(ttf|eot|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&name=assets/fonts/[name].[hash].[ext]"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&name=assets/images/[name].[hash].[ext]"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({title: 'Pvjs'})
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080
    }
};
