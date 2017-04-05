var webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'Pvjs',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', 'json'],
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    },
    module: {
        rules: [
            // Create an external stylesheet rather than inlined to support Angular CLI users
            // In Angular CLI, all styles must be specified in the styles property of a component
            // See: https://github.com/angular/angular-cli/issues/1459
            // Note: the typestyles will still be imported fine since they are not css files
            // Angular CLI users should add 'dist/style.css' into their component styles
            // TODO: Add an example of this in the README
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader']
                })
            },
            { test: /\.json$/, use: 'json-loader'},
            { test: /\.ts(x?)$/, use: 'ts-loader?' + JSON.stringify({
                compilerOptions: {
                    declaration: false
                }
            }) },
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
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin({
            filename: "style.css",
            allChunks: true
        })
    ]
};
