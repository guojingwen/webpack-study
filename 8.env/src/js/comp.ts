function createComp(
  tag = 'div',
  attrs = {} as { [key: string]: string },
  children = '' as string | Array<any>
) {
  const ele = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    ele.setAttribute(k, v);
  });
  if (typeof children === 'string') {
    ele.appendChild(document.createTextNode(children));
  } else {
    children.forEach((child) => {
      if (typeof child === 'string') {
        ele.appendChild(document.createTextNode(child));
      } else {
        ele.appendChild(createComp(child.tag, child.attrs, child.children));
      }
    });
  }
  return ele;
}

export default createComp;
