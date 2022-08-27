(self["webpackChunk_9_codeSpiting_runtime"] = self["webpackChunk_9_codeSpiting_runtime"] || []).push([["main"],[
/* 0 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const button = document.createElement('button');
button.innerHTML = '加载元素';
button.addEventListener('click', () => {
  __webpack_require__.e(/* import() | element */ "element").then(__webpack_require__.bind(__webpack_require__, 1)).then(({ default: element }) => {
    document.body.appendChild(element);
  });
});
document.body.appendChild(button);

/***/ })
],
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(0));
/******/ }
]);