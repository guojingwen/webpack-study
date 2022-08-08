const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'none',
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(je?pg|png|gif)$/i,
                type: 'asset',
                generator: {
                  filename: '[name].[hash:6][ext]',
                  outputPath: 'img'
                },
                parser: {
                  dataUrlCondition: {
                    maxSize: 100 * 1024,
                  }
                }
            },
            {
                test: /\.ttf|eot|woff2?$/i,
                type: "asset/resource",
                generator: {
                  filename: "[name].[hash:6][ext]",
                  outputPath: 'font'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
}