const path = requre('path');
const fs = require('fs');
const parser = require('@babel/parser');
const env = require('@babel/parse-env');
const traverse = require('@babel/traverse')
const {transformFromAst} = require('@babel/core')


module.exports = class Webpack {
    constructor(options) {
        const {entry, output}  = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    run() {
        const info = this.parse(this.entry);
        this.modules.push(info);
        const keys = Object.keys(info.dependencies);

        keys.forEach(key => {
            const item = info.dependencies[key];
            this.modules.push(this.parse(item));
        });
        const obj = {}
        modules.forEach(module => {
            obj[module.entryFile] = {
                dependencies: module.dependencies,
                code: module.code
            }
        });
        this.file(obj)
    }
    parse(entryFile) {
        let content = fs.readFileSync(entryFile, 'utf-8');
        const dependencies = {};
        const ast = parser.parse(content, {
            type: 'module'
        });
        traverse.default(ast, {
            ImportDeclaration(path, state) {
                const newFilePath = './' + 
                path.join(path.dirname(entryFile), node.source.value);
                dependencies[node.source.value] = newFilePath;
            }
        })
        transformFromAst()
        const {code} = transformFromAst(ast, {
            presets: ['@babel/parest-env']
        });
        return {
            entryFile,
            dependencies,
            code
        }
    }
    file(code) {
        const filePath = path.join(this.output.path, this.output.filename);;

        const newCode = JSON.stringify(code)
        const bundle = `(
            function require(module){
                function reRequire(relativePath){
                    return require(graph[module].dependencies[relativePath]) 
                }
                var exports = {};
                (function(require, exports, code){
                    eval(code);
                })(reRequire, exports , graph[module].code)
               
                return exports;
            }
            require("${this.entry}")
        )(${newCode})`
        fs.writeFileSync(filePath, bundle, 'utf-8')
    }
}