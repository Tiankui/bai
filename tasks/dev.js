module.exports = function(grunt) {
    return grunt.registerTask("dev", "runs bai dev tasks", function() {
        var appTasks;
        appTasks = require(process.cwd() + "/engine/config/application").appTasks;
        return grunt.task.run(appTasks.dev);
    });
};
