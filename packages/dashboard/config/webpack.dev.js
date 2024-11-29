const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const common = require('./webpack.common');

const packageJSON = require('../package.json');


/** @type { import('webpack').Configuration } */
const devConfig = {
    mode: "development",
    output: {
        publicPath: "http://localhost:8083/"
    },
    devServer: {
        port: 8083,
        historyApiFallback: {
            index: "/index.html"
        },
        headers: {
            // Allows us to avoid CORS errors
            "Access-Control-Allow-Origin": "*"
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "dashboard",
            filename: "remoteEntry.js",
            exposes: {
                './DashboardApp': './src/bootstrap'
            },
            shared: packageJSON.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(common, devConfig)