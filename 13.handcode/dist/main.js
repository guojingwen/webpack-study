(function (graph) {
  function require(module) {
    function reRequire(relativePath) {
      return require(graph[module].dependencies[relativePath]);
    }
    var exports = {};
    (function (require, exports, code) {
      eval(code);
    })(reRequire, exports, graph[module].code);
    return exports;
  }
  require("./step2/src/index.js");
})({
  "./step2/src/index.js": {
    dependencies: {
      "./a.js": "./step2/src/a.js",
      "./b.js": "./step2/src/b.js",
    },
    code: `
        "use strict";
        var _a = _interopRequireDefault(require("./a.js"));
        var _b = _interopRequireDefault(require("./b.js"));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { "default": obj };
        }
        console.log(_a["default"] + "hello,webpack-bundle!");
    `,
  },
  "./step2/src/a.js": {
    dependencies: { "./c.js": "./step2/src/c.js" },
    code: `
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports["default"] = void 0;
        var _c = _interopRequireDefault(require("./c.js"));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { "default": obj };
        }
        var _default = "haha" + _c["default"];
        exports["default"] = _default;`,
  },
  "./step2/src/b.js": {
    dependencies: {},
    code: `
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports["default"] = void 0;
        var _default = "xixi";
        exports["default"] = _default;
    `,
  },
  "./step2/src/c.js": {
    dependencies: {},
    code: `
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports["default"] = void 0;
        var _default = "c";
        exports["default"] = _default;
    `,
  },
});
