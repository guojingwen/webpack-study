(function(graph){
        function require(module){
            function reRequire(relativePath){
                return require(graph[module].dependencies[relativePath]) 
            }
            var exports = {};
            (function(require,exports,code){
                eval(code)
            })(reRequire,exports,graph[module].code)
            return exports;
        }
        require('./step2/src/index.js')
    })({"./step2/src/index.js":{"dependencies":{"./a.js":"./step2/src/a.js","./b.js":"./step2/src/b.js"},"code":"\"use strict\";\n\nvar _a = _interopRequireDefault(require(\"./a.js\"));\nvar _b = _interopRequireDefault(require(\"./b.js\"));\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\nconsole.log(_a[\"default\"] + \"hello,webpack-bundle!\");"},"./step2/src/a.js":{"dependencies":{"./c.js":"./step2/src/c.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _c = _interopRequireDefault(require(\"./c.js\"));\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\nvar _default = \"haha\" + _c[\"default\"];\nexports[\"default\"] = _default;"},"./step2/src/b.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = \"xixi\";\nexports[\"default\"] = _default;"},"./step2/src/c.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = \"c\";\nexports[\"default\"] = _default;"}})