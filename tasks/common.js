module.exports = function(grunt) {
    return grunt.registerTask("common", "runs bai common lifecycle tasks", function() {
        var appTasks;
        appTasks = require(process.cwd() + "/engine/config/application").appTasks;
        return grunt.task.run(appTasks.common);
    });
};