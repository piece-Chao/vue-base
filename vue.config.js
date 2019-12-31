const path = require('path')
const webpack = require('webpack')
const publicPath = process.env.BASE_URL
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
    publicPath: publicPath,
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host: 'localhost',
        port: 8000,
        proxy: {
            '/api': {
                target: 'beta-baidu.com',
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./vendor-manifest.json')
            }),
            new AddAssetHtmlPlugin([{
                filepath: path.resolve(__dirname, './static/dll.vendor.js'),
                outputPath: path.posix.join('static', './'),
                publicPath: path.posix.join('./', './static'),
                includeSourcemap: false,
                hash: true
            }])
        ]
    }
}
