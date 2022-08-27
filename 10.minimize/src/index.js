/**
 * 测试 terserOptions.mangle: true
 * 测试 terserOptions.toplevel
 */
function alert (arg) {
    alert(arg);
}
alert('abc')

/**
 * 测试 terserOptions.compress.arguments: true
 * 将 console.log(arguments[0] + arguments[1]); 转换成 console.log(num1 + num2);
 */
function mySum(num1, num2) {
    console.log(arguments[0] + arguments[1]);
}
mySum(2, 3);


/**
 *  测试 terserOptions.compress.dead_code
 *  移除不可达代码
 *  实测，不管配置不配置都会将不可代码移除
 * 
 */
if(false) {
    console.log('不可达代码，将被移除');
}

/**
 * 测试 terserOptions.keep_classnames: true,
 */
class Persion {

}
new Persion();