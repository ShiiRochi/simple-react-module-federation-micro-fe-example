const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJSON = require('../package.json');

const common = require('./webpack.common');

const domain = process.env.PRODUCTION_DOMAIN;

/** @type { import('webpack').Configuration } */
const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js"
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                marketing: `marketing@${domain}/packages/marketing/latest/remoteEntry.js`,
            },
            shared: packageJSON.dependencies
        })
    ]
}

module.exports = merge(common, prodConfig)