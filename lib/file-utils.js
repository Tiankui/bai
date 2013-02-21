/* file 操作相关工具集 */

var grunt, fs;

grunt = require("grunt");
fs = require("fs");

module.exports = (function(_, fs, grunt) {
  return _({}).tap(function(exports) {
    exports.copy = function(src, dest, ignore_path) {
      //读取文件信息,处理连接符文件
      var file = fs.lstatSync(src);

      if(file.isDirectory()) {
        exports.copyDir(src, dest, ignore_path);
      } else {
        grunt.file.copy(src, dest);
        console.log("  " + dest.substring(ignore_path.length).replace(/^\//,"../").info);
      }
    };

    exports.copyDir = function(src, dest, ignore_path ) {
      //prefix_len为忽略的绝对路径字长
      mkdirIfNecessary(src, dest);

      var paths = fs.readdirSync(src);

      _(paths).each(function(path) {
        exports.copy(src+"/"+path,dest+"/"+path,ignore_path);
      });
    };
    // to review
    exports.overwritePackageJson = function(src, name) {
      var baiPackageJson, newPackageJson;

      baiPackageJson = grunt.file.readJSON("" + __dirname + "/../package.json");

      newPackageJson = _(grunt.file.read(src)).template({
        name: _(name).dasherize(),
        versions: {
          bai: baiPackageJson["version"]
        }
      });

      return grunt.file.write(src, newPackageJson);
    };

    exports.loadConfigurationFile = function(name) {
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

    var mkdirIfNecessary = function(src, dest) {
      var checkDir = fs.statSync(src);
      try {
        fs.mkdirSync(dest, checkDir.mode);
      } catch (e) {
        if (e.code !== 'EEXIST') {
          throw e;
        }
      }
    };
  });
})(grunt.util._, fs, grunt);
