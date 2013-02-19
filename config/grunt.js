module.exports = {
  run: function(grunt) {
    grunt.loadTasks('engine/tasks');
    grunt.loadNpmTasks('bai');
    grunt.task.run('configure');
  }
};
