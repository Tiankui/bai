module.exports = function(grunt) {
  grunt.registerTask("dev", "运行开发环境...", function() {
    var appTasks,configJSON;
    configJSON = require(process.cwd() + "/engine/config/application");
    appTasks = configJSON.appTasks || configJSON.Task;
    grunt.log.writeln('运行开发环境'.warn);
    return grunt.task.run(appTasks.dev);
  });
};
