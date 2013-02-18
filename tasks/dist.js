module.exports = function(grunt) {
    return grunt.registerTask("dist", "运行dist任务", function() {
        var appTasks;
        appTasks = require(process.cwd() + "/config/application").appTasks;
        console.log(11111)
        return grunt.task.run(appTasks.dist);
    });
};