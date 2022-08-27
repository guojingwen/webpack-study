(() => {
  "use strict";
  var e = [
      ,
      (e, r, _) => {
        function sum(e, r) {
          return e + r;
        }
        function mul(e, r) {
          return e * r;
        }
        _.r(r), _.d(r, { mul: () => mul, sum: () => sum });
      },
    ],
    r = {};
  function __webpack_require__(_) {
    var o = r[_];
    if (void 0 !== o) return o.exports;
    var t = (r[_] = { exports: {} });
    return e[_](t, t.exports, __webpack_require__), t.exports;
  }
  (__webpack_require__.d = (e, r) => {
    for (var _ in r)
      __webpack_require__.o(r, _) &&
        !__webpack_require__.o(e, _) &&
        Object.defineProperty(e, _, { enumerable: !0, get: r[_] });
  }),
    (__webpack_require__.o = (e, r) =>
      Object.prototype.hasOwnProperty.call(e, r)),
    (__webpack_require__.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    });
  var _ = {};
  (() => {
    __webpack_require__.r(_);
    var e = __webpack_require__(1);
    console.log((0, e.sum)(20, 30)),
      (function alert(e) {
        alert(e);
      })("abc"),
      (function mySum(e, r) {
        console.log(e + r);
      })(2, 3);
    new (class Persion {})();
  })();
})();
