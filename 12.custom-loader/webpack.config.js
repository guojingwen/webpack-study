const path = require('path');

module.exports = {
    mode: 'none',
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        // path: './dist' // 必须是绝对路径
        path: path.resolve(__dirname, './dist')
    },
    resolveLoader: {
        // 配置 resolveLoader.modules
        modules: ['node_modules', path.resolve(__dirname, 'loaders')],
    },
    module: {
        rules:[
            /* {
                test: /\.js$/i,
                use: [
                    'second_exec-loader',
                    'first_exec_loader',
                ]
            }, */
            {
                test: /\.js$/i,
                enforce: "pre",
                use: [
                    'second_exec-loader',
                ]
            }
            ,{
                test: /\.js$/i,
                use: [
                    'first_exec_loader',
                ]
            }
        ]
    }
}