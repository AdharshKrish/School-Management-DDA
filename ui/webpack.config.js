const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "index.bundle.js"
    },
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false,
                changeOrigin: true,
                pathRewrite: {'^/api': ''}
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /nodeModules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}