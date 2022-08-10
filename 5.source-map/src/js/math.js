export function add(...arr) {
    // console.log(aaa);
    return arr.reduce((sum, item) => sum + item, 0);
  }