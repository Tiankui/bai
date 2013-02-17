module.exports = function(grunt) {
    return grunt.registerTask("common", "runs linemans common lifecycle tasks", function() {
        var appTasks;
        appTasks = require(process.cwd() + "/config/application").appTasks;
        return grunt.task.run(appTasks.common);
    });
};