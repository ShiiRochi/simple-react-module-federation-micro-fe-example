const { VueLoaderPlugin } = require('vue-loader');

/** @type { import('webpack').Configuration } */
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].[contenthash].js"
    },
    resolve: {
        extensions: [".js", ".vue"]
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.scss|\.css$/i,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env' // support for ESXXXX syntaxes
                        ],
                        plugins: [
                            // adds additional code to allow such features like async/await
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [ new VueLoaderPlugin() ]
}