module.exports = function(grunt) {
    return grunt.registerTask("dev", "运行开发环境...", function() {
        var appTasks;
        appTasks = require(process.cwd() + "/engine/config/application").appTasks;
        grunt.log.writeln('运行开发环境'.warn);
        return grunt.task.run(appTasks.dev);
    });
};
