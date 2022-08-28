import './style.css';
import './sideEffect_abc';
import './useExports_format';
import {add} from './usedExports';

console.log(add(2,3));

const ele = document.createElement('h3');
ele.className = 'title';
ele.innerText = '测试css tree sharking';
document.body.appendChild(ele);