const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    
    entry: {
        bundle: './src/index.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },

    module: {
        rules: [
            { 
                // Loader : Babel Transpiler
                // Transpile all JS files via Babel (.babelrc)
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
            {
                // Loader : CSS
                // Use 'import' for css in component 
                // Add <style> into page
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                // Loader : IMG (png,svg,gif,jpg)
                // Use 'import' for image path in component
                // Add them in the output directory
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                // Loader : Fonts
                // Use @Font-face in css
                // Add them in the output directory
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },

    plugins:[
        // Plugin : CleanWebpack
        // Clean before - hand the output directory
        new CleanWebpackPlugin(['build']),
        // Plugin : HtmlWebpack
        // Generate html output, automate bundle sourcing
        new HtmlWebpackPlugin({
            title: 'SENOVEA',
            template: './src/index.html'
        })
    ],

    optimization: {
        // Optimization : splitChunks
        // ?? New way to do code splitting ?? 
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }

};