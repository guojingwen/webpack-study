import Vue from 'vue';
import App from './app.vue';

const vueRoot = document.createElement('div');
document.body.appendChild(vueRoot);

new Vue({
  render: (h) => h(App),
}).$mount(vueRoot);
