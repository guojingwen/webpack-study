// normal loader
module.exports = function (content) {
  console.log("first_exec-loader");
  return content;
};
// pitch loader
module.exports.pitch = function () {
  console.log("first_exec-loader pitch");
};
