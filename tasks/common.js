module.exports = function(grunt) {
  grunt.registerTask("common", "注册common命令集合", function() {
    var appTasks,configJSON;
    
    configJSON = require(process.cwd() + "/engine/config/application");
    appTasks = configJSON.appTasks || configJSON.Task;

    grunt.log.writeln('运行common命令集合'.warn);
    grunt.task.run(appTasks.common);
  });
};
