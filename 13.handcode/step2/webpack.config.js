const path = require('path');

module.exports = {
  entry: "./step2/src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle2.js",
  },
};
