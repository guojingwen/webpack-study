const texts: Array<string> = ['hello', 'webpack'];

const h2 = document.createElement('h2');
h2.innerText = texts.at(-1)!;

const ele = document.getElementById('app');
ele?.appendChild(h2);

console.log(texts.join(' ') + 23);
