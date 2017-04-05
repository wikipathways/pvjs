var webpack = require('webpack');
const path = require('path');

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
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']},
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
        })
    ]
};
