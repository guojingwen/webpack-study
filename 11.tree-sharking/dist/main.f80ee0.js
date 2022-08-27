(() => {
  "use strict";
  var __webpack_modules__ = {
      "./src/sideEffect_abc.js": /*!*******************************!*\
  !*** ./src/sideEffect_abc.js ***!
  \*******************************/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        window.abc = "abc";
      },
      "./src/usedExports.js": /*!****************************!*\
  !*** ./src/usedExports.js ***!
  \****************************/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        function add(a, b) {
          return a + b;
        }
        __webpack_require__.d(__webpack_exports__, { add: () => add });
      },
    },
    __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = (__webpack_module_cache__[moduleId] = { exports: {} });
    return (
      __webpack_modules__[moduleId](
        module,
        module.exports,
        __webpack_require__
      ),
      module.exports
    );
  }
  (__webpack_require__.d = (exports, definition) => {
    for (var key in definition)
      __webpack_require__.o(definition, key) &&
        !__webpack_require__.o(exports, key) &&
        Object.defineProperty(exports, key, {
          enumerable: !0,
          get: definition[key],
        });
  }),
    (__webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop)),
    (() => {
      /*!**********************************!*\
  !*** ./src/index_usedExports.js ***!
  \**********************************/ __webpack_require__(
        /*! ./sideEffect_abc */ "./src/sideEffect_abc.js"
      );
      var _usedExports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./usedExports */ "./src/usedExports.js"
      );
      console.log((0, _usedExports__WEBPACK_IMPORTED_MODULE_1__.add)(2, 3));
    })();
})();
//# sourceMappingURL=main.f80ee0.js.map
