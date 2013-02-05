module.exports = {
  run: function(grunt) {
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-mincss');
    grunt.task.run('configure');
  }
};
