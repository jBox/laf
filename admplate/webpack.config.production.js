"use strict";

const webpack = require("webpack");
const Path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: "production",

    entry: [
        "core-js/stable",
        "regenerator-runtime/runtime",
        Path.resolve(__dirname, "src/index.js")
    ],

    output: {
        filename: "[name].[chunkhash].js",
        path: Path.resolve(__dirname, "dist"),
    },

    externals: {
        jquery: "jQuery"
    },

    module: {
        rules: [{
                test: /\.js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: false,
                        plugins: ["@babel/plugin-proposal-class-properties"],
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[name]_[local]__[hash:base64:5]"
                        }
                    },
                    "postcss-loader",
                ],
            },
        ],
    },

    optimization: {
        minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()],
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    name: "main"
                }
            },
        },
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),

        new ManifestPlugin()
    ],

    resolve: {
        modules: [Path.resolve(__dirname, "../node_modules"), "node_modules"]
    }
}