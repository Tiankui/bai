module.exports = function(grunt) {
    return grunt.registerTask("dev", "runs linemans dev lifecycle tasks", function() {
        var appTasks;
        appTasks = require(process.cwd() + "/engine/config/application").appTasks;
        return grunt.task.run(appTasks.dev);
    });
};