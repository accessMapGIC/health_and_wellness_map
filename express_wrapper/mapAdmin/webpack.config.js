var webpack = require("webpack");
const HtmlWebPackPlugin = require('html-webpack-plugin');

var config = {
    mode: "development",
    entry: {
        home: "./react/home/index.jsx",
    },
    output: {
        path: __dirname + "/public/javascripts",
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(jsx|js)?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["react"],
                    plugins: [
                        ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css"}],
                        ['transform-class-properties'],
                        ["transform-object-rest-spread"]
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            hash: true,
            filename: "index.html",
            template: "./public/index.html"
        })
    ],
    resolve: {
        alias: {moment: `moment/moment.js`}
    },
    optimization: {
        minimize: true,
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'async',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
			}
		}
    },
    devServer: {
        historyApiFallback: true
    }
};

module.exports = config;
