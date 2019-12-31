const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const vendor = ['vue/dist/vue.esm.js', 'vue', 'vue-router', 'axios']
const dllConfig = {
    entry: {
        vendor: vendor
    },
    output: {
        path: path.join(__dirname, '../static'),
        filename: 'dll.[name].js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../', '[name]-manifest.json'),
            name: '[name]',
            context: __dirname
        }),
        new UglifyJsPlugin()
    ]
}
webpack(dllConfig, function (err, stats) {
    if (err) throw err
})
