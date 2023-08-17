module.exports = function (content) {
  console.log("second_exec-loader");
  return content;
};

module.exports.pitch = function () {
  console.log("second_exec-loader pitch");
};
