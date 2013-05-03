var extend = require("./lib/cloneextend");

module.exports = {
  config:{
    application:require("./config/app"),
    files:require( "./config/files"),
    grunt:require("./config/grunt"),
    ejs:require(process.cwd()+ "/node_modules/ejs")||"please install ejs",
    extend:function (key,newOBJ) {
      return extend.replace(module.exports.config[key],newOBJ);
    }
  }
};
