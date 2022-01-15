const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: {
        demo: resolve(__dirname, './examples/app.tsx'),
    },
    output: {
        filename: '[name].module.js',
        publicPath: '/examples/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.webpack.json',
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Scene2D Examples',
            filename: 'index.html',
            inject: 'body',
            publicPath: '/examples/',
        }),
    ],
    devServer: {
        port: 4099,
        open: ['/examples/index.html'],
        hot: true,
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: '/examples/index.html' }
            ]
        },   // 处理单页应用 404 问题
    }
}
