const path = require('path');

module.exports = {
    mode: 'none',
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        // path: './dist' // 必须是绝对路径
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
                // webpack5 不再需要file-loader url-loader raw-loader
                // 它内置了 资源模块类型 asset module type
                type: 'asset',
                generator: { // 也可以配置 output.assetModuleFilename: 'img/[name].[chunkhash:6][ext]'
                  filename: 'img/[name].[hash:6][ext]'
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
                  filename: "font/[name].[hash:6][ext]"
                }
            }
        ]
    }
}