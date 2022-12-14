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
                        loader: 'file-loader',
                        options: {
                            // name: "img/[name].[hash:6].[ext]",
                            name: "[name].[hash:6].[ext]",
                            outputPath: 'img'
                        }
                    }
                ]
            }
        ]
    }
}