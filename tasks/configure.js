module.exports = function(grunt) {
    var expandFiles, _;
    _ = grunt.util._;
    expandFiles = function(files, parent) {
        return _(parent || {}).tap(function(parent) {
            return _(files).each(function(file, name) {
                if (_(file).isString() || _(file).isArray()) {
                    return parent[name] = grunt.file.expand(file);
                } else if (_(file).isObject()) {
                    parent[name] = {};
                    return expandFiles(file, parent[name]);
                }
            });
        });
    };
    return grunt.registerTask("configure", "(Re-)expands all file paths and (re-)initializes the grunt config", function() {
        var application, expandedFiles, files;
        application = require(process.cwd() + "/config/application");
        files = require(process.cwd() + "/config/files");
        expandedFiles = _(expandFiles(files)).extend({
            glob: files
        });
        return grunt.initConfig(_(application).extend({
            files: expandedFiles
        }));
    });
};