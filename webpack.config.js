const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: {
        demo: resolve(__dirname, './demo/app.tsx'),
    },
    output: {
        filename: '[name].module.js',
        path: resolve(__dirname, './demo'),
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
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Canvas2D Demo App',
            filename: 'index.html',
            // template: resolve(__dirname, './demo/templates/index.html'),
            inject: 'body',
        }),
    ],
    devServer: {
        port: 4099,
        open: ['./index.html'],
        hot: true,
    }
}
