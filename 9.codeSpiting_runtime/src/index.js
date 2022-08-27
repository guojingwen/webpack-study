const button = document.createElement('button');
button.innerHTML = '加载元素';
button.addEventListener('click', () => {
  import(
    /* webpackChunkName: 'element' */
    './element'
  ).then(({ default: element }) => {
    document.body.appendChild(element);
  });
});
document.body.appendChild(button);