import "./css/style.css";
// import "./css/test.less";
import "./css/test.scss";

function component(){
    const element = document.createElement('div');
    element.innerHTML = 'Hello Webpack!';
    element.className = 'content';
    return element;
}
document.body.appendChild(component());