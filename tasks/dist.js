module.exports = function(grunt) {
  grunt.registerTask("dist", "运行dist任务", function() {
    var appTasks,configJSON;
    configJSON = require(process.cwd() + "/engine/config/application");
    appTasks = configJSON.appTasks || configJSON.Task;
    grunt.log.writeln('生成dist文件'.warn);
    grunt.task.run(appTasks.dist);
  });
};
