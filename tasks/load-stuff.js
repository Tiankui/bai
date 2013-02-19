var path =  require('path');

module.exports = function(grunt) {
    return grunt.util._([
        "grunt-contrib-clean",
        "grunt-contrib-concat",
        "grunt-contrib-jshint",
        "grunt-contrib-less",
        "grunt-contrib-mincss",
        "grunt-contrib-uglify",
        "grunt-contrib-watch"
    ]).each(function(module) {
        return grunt.loadNpmTasks(path.join("bai/node_modules/" + module));
    });
};