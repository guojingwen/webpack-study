(function(graph) {
            function require(module) {
                var exports = {};
                (function(code){
                    eval(code);
                })(graph[module].code);
                return exports;
            };
            require('./src/index.js');
        })("console.log(1234);");