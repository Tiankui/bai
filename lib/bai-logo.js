/*
 * LOGO for bai
 */

var Bai =  require('../package.json');

module.exports = function () {
  console.log(("\n\n  Heino! Everyone!~~ Welcome to use  `" + Bai.name.toUpperCase() + "`  FE-engine!").warn.bold);
  console.log("  " + Bai.description.data);
  console.log("  版本: ".data + Bai.version + "\n\n");
};
