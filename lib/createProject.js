/*
 * CREATEPROJECT--new a project
 *
 * Author: zhouweiping(Tiankui)
 * Email: eric.prototype@gmail.com
 * Data: 2013-04-28
 * It's distributed under the MIT license(http://mit-license.org).
 */

module.exports = createProject;

var baiLogo = require('./baiLogo'),
    fileUtils = require('./fileUtils'),
    npmUtils = require('./npmUtils'),
    path = require('path');

function createProject (project_name,options) {

  var src = path.join(__dirname,"../tpl","base"),
  dest = process.cwd() + "/" + project_name,
  ignore_path = process.cwd();

  if (options.server === true) {
    src = path.join(__dirname,"../tpl","daibi");
  }
  //todo 项目初始化描述
  baiLogo();
  console.log("  项目路径:  " + dest + "\n\n  项目生成中...\n");

  fileUtils.copyDir(src,dest,ignore_path);
  //为模版生成新的PKG文件
  fileUtils.overwritePackageJson(dest + "/package.json", project_name);

  npmUtils.installFrom(dest,function (error,stdout) {
    if (error) {
      console.error("出错了.请把错误信息记录下来并联系伟平.".error);
      console.trace();
    }else{
      console.error("  cd `" + project_name + '` 开始编写您的项目。' + "\n" + "  帮助请运行 `bai -h`");
    }
  });
}
