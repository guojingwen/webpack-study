const path = require('path');
const fs = require('fs');

module.exports = class Webpack {
    constructor(options) {
        const {entry, output} = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    run() {
        console.log(123);
        // this.parse(this.entry);
        const filepath = path.join(__dirname, this.entry)
        const code = fs.readFileSync(filepath, {encoding: 'utf-8'});
        this.file(code);
    }
    file(code) {
        const filePath = path.join(this.output.path, this.output.filename);
        console.log(filePath);
        const newCode = JSON.stringify(code);
       /*  (function(graph) {
            function require(module) {
                (function(code){
                    eval(code);
                })(graph[module].code);
            };
            require(this.entry);
        })(newCode); */
        const bundle = `(function(graph) {
            function require(module) {
                var exports = {};
                (function(code){
                    eval(code);
                })(graph[module].code);
                return exports;
            };
            require('${this.entry}');
        })(${newCode});`;
        fs.writeFileSync(filePath, bundle, "utf-8")
    }
}