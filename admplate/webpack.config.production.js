"use strict";

const webpack = require("webpack");
const Path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = require("./package").config;

module.exports = {
    mode: "production",

    entry: { main: Path.resolve("src/index.js") },

    output: {
        filename: "[name].[chunkhash].js",
        path: Path.resolve("static/dist"),
    },

    externals: {
        jquery: "jQuery"
    },

    module: {
        rules: [{
                test: /\.js$/i,
                exclude: /node_modules/,
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

    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
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
    ]
};