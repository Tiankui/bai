/* file 操作相关工具集 */

var grunt = require("grunt"),
    _ = grunt.util._,
    fs = require("fs");

function mkdirIfNecessary (src, dest) {
  var checkDir = fs.statSync(src);
  try {
    fs.mkdirSync(dest, checkDir.mode);
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw e;
    }
  }
}

exports.copy = function copy (src, dest, ignore_path) {
  //读取文件信息,处理连接符文件
  var file = fs.lstatSync(src);
  if(file.isDirectory()) {
    exports.copyDir(src, dest, ignore_path);
  } else {
    grunt.file.copy(src, dest);
    if(ignore_path)
      console.log("  " + dest.substring(ignore_path.length).replace(/^\//,"../").info);
  }
};

exports.copyDir = function copyDir (src, dest, ignore_path ) {
  //prefix_len为忽略的绝对路径字长
  mkdirIfNecessary(src, dest);

  var paths = fs.readdirSync(src);

  paths.forEach(function(path) {
    exports.copy(src+"/"+path,dest+"/"+path,ignore_path);
  });
};
// to review
exports.overwritePackageJson = function overwritePackageJson (src, name) {
  var baiPackageJson, newPackageJson;

  baiPackageJson = grunt.file.readJSON(__dirname + "/../package.json");

  newPackageJson = _(grunt.file.read(src)).template({
    name: _(name).dasherize(),
    versions: {
      bai: baiPackageJson.version
    }
  });

  return grunt.file.write(src, newPackageJson);
};

exports.loadConfigurationFile = function loadConfigurationFile (name) {
  try {
    return require(process.cwd() + "/engine/config/" + name);
  } catch (e) {
    if (e.code === "MODULE_NOT_FOUND") {
      return {};
    } else {
      throw e;
    }
  }
};

