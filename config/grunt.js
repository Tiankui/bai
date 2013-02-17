module.exports = {
  run: function(grunt) {
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('bai');
    grunt.task.run('configure');
  }
};
