// 创建一个i元素, 设置一个字体
import '../font/iconfont.css';
const iEl = document.createElement('i');
iEl.className = 'iconfont icon-ashbin why_icon';
document.body.appendChild(iEl);

import '../css/resources.scss';
import smallImageUrl from '../img/38.jpg';
const smallImage = new Image();
smallImage.src = smallImageUrl;
document.body.appendChild(smallImage);

const bigImage = document.createElement('div');
bigImage.className = 'big-img';
document.body.appendChild(bigImage);
