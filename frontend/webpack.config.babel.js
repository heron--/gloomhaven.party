'use strict';

if (!global._babelPolyfill) {
    require('babel-polyfill');
}

import path from 'path';
import glob from 'glob';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import webpackQueryString from 'webpack-query-string';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const __DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = process.env.NODE_ENV === 'production';

const defines = {
    '__DEV__': __DEV__,
    '__PROD__': __PROD__,
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
};

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './entry.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react'],
                            plugins: ['transform-runtime', 'transform-object-assign']
                        }
                    },
                    'eslint-loader'
                ]
            },
            {
                test: /\.(jade|pug)$/,
                use: [
                    {
                        'loader': 'pug-loader' 
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: __DEV__
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: __DEV__
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: __DEV__,
                            plugins: () => {
                                autoprefixer({
                                    browsers: ['> 0.1%']
                                })
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: __DEV__
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new webpack.DefinePlugin(defines),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new HtmlWebpackPlugin({
            template: 'template.pug',
            title: 'Gloomhaven.party',
            defines: defines
        })
    ],
    devServer: {
        inline: true,
        hot: false,
        host: '0.0.0.0',
        stats: {
            colors: true,
            progress: true,
            chunkModules: false,
            assets: false
        }
    }
};

if(__DEV__) {

    config.output.publicPath = 'http://localhost:8080/';

    config.devtool = 'source-map';

    config.plugins.push(
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })
    );
}

if(__PROD__) {

    config.output.publicPath = '';

    config.plugins.push(
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );

    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true,
                warnings: false
            },
            output: {
                comments: false
            }
        })
    );

    config.plugins.push(
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'zopfli',
            test: /\.js$$/
        })
    );
}

module.exports = config;
