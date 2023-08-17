const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const { transformFromAst } = require("@babel/core");

module.exports = class webpack {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  run() {
    //开始分析入口模块的内容
    const info = this.parse(this.entry);
    //递归分析其他的模块
    // console.log(info);
    this.modules.push(info);
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item;
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.parse(dependencies[j]));
        }
      }
    }
    const obj = {};
    this.modules.forEach((item) => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code,
      };
    });
    // console.log(obj);
    this.file(obj);
  }
  parse(entryFile) {
    const content = fs.readFileSync(entryFile, "utf-8");

    const ast = parser.parse(content, {
      sourceType: "module",
    });
    const dependencies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        //   "./a.js" => "./src/a.js"
        const newPathName =
          "./" + path.join(path.dirname(entryFile), node.source.value);
        // console.log(newPathName);
        dependencies[node.source.value] = newPathName;
      },
    });
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });

    return {
      entryFile,
      dependencies,
      code,
    };
  }
  file(code) {
    //创建自运行函数，处理require,module,exports
    //生成main.js = >dist/main.js
    const filePath = path.join(this.output.path, this.output.filename);
    console.log(filePath);
    //require("./a.js")
    // this.entry = "./src/index.js"
    const newCode = JSON.stringify(code);
    const bundle = `(function(graph){
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
        require('${this.entry}')
    })(${newCode})`;
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
};
