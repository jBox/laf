"use strict";

const webpack = require("webpack");
const Path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV === "development";

module.exports = {
    mode: devMode ? "development" : "production",

    entry: [
        "core-js/stable",
        "regenerator-runtime/runtime",
        Path.resolve(__dirname, "src/index.js")
    ],

    devtool: "source-map",

    output: {
        filename: "[name].js",
        path: Path.resolve(__dirname, "dist"),
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

    externals: {
        jquery: "jQuery"
    },

    optimization: {
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
            filename: devMode ? "[name].css" : "[name].[hash].css",
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        })
    ],

    resolve: {
        modules: [Path.resolve(__dirname, "../node_modules"), "node_modules"]
    }
}