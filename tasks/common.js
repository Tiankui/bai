module.exports = function(grunt) {
    return grunt.registerTask("common", "注册common命令集合", function() {
        var appTasks;
        appTasks = require(process.cwd() + "/engine/config/application").appTasks;
        grunt.log.writeln('运行common命令集合'.warn);
        return grunt.task.run(appTasks.common);
    });
};
