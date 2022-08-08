const path = require('path');

module.exports = {

    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        // path: './dist' // 必须是绝对路径
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(je?pg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: "[name].[hash:6].[ext]",
                            outputPath: 'img',
                            limit: 50 * 1024, // 50kb 一般顶多配置10kb，这里是为了演示
                        }
                    }
                ]
            }
        ]
    }
}