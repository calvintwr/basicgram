// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './../dist'),
        filename: '[name].[contenthash].js'
    },
    target: "web",
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: ['style-loader','vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
              test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
              loader: 'url-loader?limit=1024'
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
    },
};
