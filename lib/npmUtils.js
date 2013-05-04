/* npm 操作相关工具集 */

var grunt = require("grunt"),
    exec = require('child_process').exec;

//返回调用函数,参数cammand为系统外部命令
exports.installFrom = function(path,callback) {
  process.chdir(path);
  //调试模式:平时不输出调用的外部命令
  //console.info(" - 正在执行 `"+command+"` 安装项目的所有依赖...");
  console.log("\n  正在安装项目所依赖的环境...\r\n");
  //终端执行外部命令,考虑到window兼容,目前只执行npm的操作
  exec('npm link bai', function(error, stdout, stderr) {
    if(error) {
      console.error("  以下命令执行时候出错!! `"+"npm link bai"+"`.");
      console.log("  " + stdout.info);
      console.error("  "+stderr);
    }
    callback(error);
  });
};
