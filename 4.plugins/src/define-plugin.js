/** webpack.config.js
new DefinePlugin({
    ENV: JSON.stringify('development')
})
*/

if(ENV === 'development') {
    console.log('你将在控制台看到这段内容')
} else {
    console.log('这段内容既不会在控制台打印，也不会在bundle.js找到');
}

// 上述代码会经过DefinePlugin处理编译成如下代码
// console.log('你将在控制看看到这段内容')