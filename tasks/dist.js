module.exports = function(grunt) {
    return grunt.registerTask("dist", "运行dist任务", function() {
        var appTasks;
        appTasks = require(process.cwd() + "/engine/config/application").appTasks;
        return grunt.task.run(appTasks.dist);
    });
};
