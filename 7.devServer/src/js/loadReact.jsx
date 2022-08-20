import React from 'react';
import ReactDom from 'react-dom';
import ReactApp from './reactApp.jsx';

const reactRoot = document.createElement('div');
document.body.appendChild(reactRoot);

ReactDom.render(<ReactApp />, reactRoot);
