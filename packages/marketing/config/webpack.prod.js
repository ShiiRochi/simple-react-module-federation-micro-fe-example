const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJSON = require('../package.json');

const common = require('./webpack.common');


/** @type { import('webpack').Configuration } */
const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        publicPath: "/packages/marketing/latest/"
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "marketing",
            filename: "remoteEntry.js",
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJSON.dependencies
        })
    ]
}

module.exports = merge(common, prodConfig)