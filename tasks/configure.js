module.exports = function(grunt) {
  var expandFiles, _;
  _ = grunt.util._;

  expandFiles = function(files, parent) {
    return _(parent || {}).tap(function(parent) {
      _(files).each(function(file, name) {
        if (_(file).isString() || _(file).isArray()) {
          parent[name] = grunt.file.expand(file);
        } else if (_(file).isObject()) {
          parent[name] = {};
          expandFiles(file, parent[name]);
        }
      });
    });
  };

  grunt.registerTask("configure", "扩展配置文件, 初始化grunt配置", function() {
    var application, expandedFiles, files;

    application = require(process.cwd() + "/engine/config/application");
    files = require(process.cwd() + "/engine/config/files");

    //生成全局文件索引,不包括lib文件夹
    expandedFiles = _(expandFiles(files)).extend({
      glob: files
    });
    grunt.log.writeln('扩展配置文件,注册Grunt命令集合'.warn);

    grunt.initConfig(_(application).extend({
      files: expandedFiles
    }));
    //console.log(expandedFiles);
  });
};
