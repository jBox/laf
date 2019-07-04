"use strict";

const webpack = require("webpack");
const Path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require("./package").config;
const devMode = process.env.NODE_ENV === "development";

module.exports = {
    mode: devMode ? "development" : "production",

    entry: { main: Path.resolve("src/index.js") },

    devtool: "source-map",

    output: {
        filename: "[name].js",
        path: Path.resolve("static/dist"),
    },

    module: {
        rules: [{
                test: /\.js$/i,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "local",
                                localIdentName: config.css
                            }
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
    ]
};