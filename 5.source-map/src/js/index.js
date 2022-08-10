import '../css/index.css';

// CommonJS导出内容, es module导入内容
import {dateFormat} from './CommonJS.js';
// es module导出内容, CommonJS导入内容
const {add}  = require('./math');

console.log('add(1,2,3) ', add(1,2,3));
console.log('dateFormat() ', dateFormat());
console.log(123+x);