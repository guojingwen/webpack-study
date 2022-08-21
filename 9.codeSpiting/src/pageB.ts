// console.log('Hello PageB');

import _ from 'lodash';
console.log(_.join(['hello', 'PageB']));

import dayjs from 'dayjs';
console.log(dayjs(), 'PageB');

const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  import(
    /* webpackChunkName: 'my-vconsole' */
    'vconsole'
  ).then((module) => {
    new module.default();
  });

  // require.ensure([], () => {
  //   const Vconsole = require('vconsole');
  //   new Vsonsole();
  // });
}

const button = document.createElement('button');
button.innerHTML = '加载元素';
button.addEventListener('click', () => {
  // prefetch -> 魔法注释(magic comments)
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  import(
    /* webpackChunkName: 'element' */
    /* webpackPrefetch: true */
    './js/element'
  ).then(({ default: element }) => {
    document.body.appendChild(element);
  });
});
document.body.appendChild(button);
