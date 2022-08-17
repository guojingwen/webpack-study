import './css/index.css';
import createComp from './js/comp';
import './js/resources';

const texts: Array<string> = ['hello', 'webpack'];
const comp = createComp('h2', { class: 'content' }, texts.at(-1));
document.body.appendChild(comp);

console.log(texts.join(' '));
