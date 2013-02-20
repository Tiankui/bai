/* Exports an object that defines
 *  all of the paths & globs that the project
 *  is concerned with.
 *
 * The "configure" task will require this file and
 *  then re-initialize the grunt config such that
 *  directives like <config:files.js.app> will work
 *  regardless of the point you're at in the build
 *  lifecycle.
 *
 * You can find the parent object in: node_modules/lineman/config/files.js
 */

module.exports = require('bai').config.extend('files', {
  js: {
    app: "app/js/**/*.js",
    vendor: "vendor/css/**/*.css",
    concatenated: "generated/js/app.js",
    minified: "dist/js/app.min.js"
  },
  coffee:{
    app: "app/js/**/*.coffee",
    generated: "generated/js/app.coffee.js"
  },
  less: {
    app: "app/css/**/*.less",
    generated: "generated/css/app.less.css"
  },
  css: {
    app: "app/css/**/*.css",
    vendor: "vendor/css/**/*.css",
    concatenated: "generated/css/app.css",
    minified: "dist/css/app.min.css"
  },
  img: {
    app: "app/img/**/*.*",
    root: "img"
  }
});
