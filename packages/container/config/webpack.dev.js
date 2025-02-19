const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const common = require('./webpack.common');

const packageJSON = require('../package.json');

/** @type { import('webpack').Configuration } */
const devConfig = {
    mode: "development",
    output: {
        publicPath: "http://localhost:8080/"
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: "/index.html"
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                marketing: "marketing@http://localhost:8081/remoteEntry.js",
                auth: "auth@http://localhost:8082/remoteEntry.js",
                dashboard: "dashboard@http://localhost:8083/remoteEntry.js",
            },
            shared: packageJSON.dependencies
        }),
    ]
}

module.exports = merge(common, devConfig)