/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-mincss');
  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '1.0',
      banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'YOUR_NAME; Licensed MIT */'
    },
    concat: {
      edit_page_js: {
        src: [
              'js/lib/jquery-1.8.3.min.js',
              'js/lib/bootstrap.min.js',
              'js/lib/bootstrap-datetimepicker.js',
              'js/lib/locales/bootstrap-datetimepicker.zh-CN.js',
              'js/lib/jcarousel_zh/lib/jquery.jcarousel.pack.js',
              'js/lib/jquery.autocomplete.js',
              'js/placeholder.js',
              'js/iframe_uploader.js',
              'js/pagenav.js',
              'js/popup.js',
              'js/preview.js'
             ],
        dest: 'js/main.js'
      },
      edit_page_css: {
        src: [
              'css/lib/bootstrap.min.css',
              'css/lib/common.css',
              'css/lib/style.css',
              'css/lib/datetimepicker.css',
              'css/lib/edit_page.css',
              'css/lib/autocomplete.css'
             ],
        dest: 'css/main.css'
      }
    },
    mincss: {
      compress: {
        files: {
          "dist/main.min.css": ["css/main.css"]
        }
      }
    },
    min: {
      edit_page_js: {
        src: ['js/main.js'],
        dest: 'dist/main.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'concat min mincss');

};
