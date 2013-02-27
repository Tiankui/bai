/**
 * Copyright(c) 2013 BJ Tiankui <eric.prototype@gmail.com>
 * 文件扩展
 */
module.exports = require('bai').config.extend('files', {
  js: {
    app: "app/js",
    concatenated: "generated/js",
    minified: "dist/js"
  },
  less: {
    app: "app/css",
    generated: "generated/css"
  },
  css: {
    app: "app/css/**/*.css",
    concatenated: "generated/css",
    minified: "dist/css"
  }
});
