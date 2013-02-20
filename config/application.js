grunt = require('grunt');

module.exports = {
  pkg: grunt.file.readJSON("package.json"),
  appTasks:{
    common: ["coffee","less","configure","concat:js","concat:css"],
    dev: ["server","watch"],
    dist: ["concat:js","concat:css","cssmin","uglify:js"]
  },

  concat:{
    js:{
      src: ["<%= files.js.app %>"],
      dest: "<%= files.glob.js.concatenated %>"
    },
    css:{
      src: ["<%= files.css.app %>"],
      dest: "<%= files.glob.css.concatenated %>"
    }
  },

  uglify:{
    js:{
      option:{
        banner: "Bai Front-end engine"
      },
      files:{
        "dist/js/app.min.js": "<%= files.glob.js.concatenated %>"
      }
    }
  },

  less: {
    compile: {
      options : {
        paths: ["app/css"]
      },
      files: {
        "generated/css/app.less.css": "<%= files.less.app %>"
      }
    }
  },

  cssmin:{
    compress:{
      file:{
        "dist/css/app.min.css": "<%= files.glob.css.concatenated %>"
      }
    }
  },
  coffee: {
        compile: {
            files: {
                "generated/js/app.coffee.js": "<%= files.coffee.app %>"
            }
        }
    },
    images: {
        files: {
            "app/img/": "<%= files.img.app %>"
        },
        root: "<%= files.glob.img.root %>",
        dev: {
            dest: "generated"
        },
        dist: {
            dest: "dist"
        }
    },

  clean: {
    js: {
      src: "<%= files.js.concatenated %>"
    },
    css: {
      src: "<%= files.css.concatenated %>"
    },
    dist: {
      src: ["dist", "generated"]
    }
  },

  server:{
    base: "generated",
    web: {
      port: 8000
    },
    apiProxy:{
      enabled: false,
      host: "localhost",
      port: 3000
    }
  },

    watch:{
        js:{
            files: ["<%= files.glob.js.app %>"],
            tasks: ["configure", "concat:js"]
        },
        css:{
            files: "<%= files.glob.css.app %>",
            tasks: ["configure","concat:css"]
        },
        coffee:{
            files: "<%= files.glob.coffee.app %>",
            tasks: ["coffee","concat:js"]
        },
        less:{
            files: "<%= files.glob.less.app %>",
            tasks: ["less","concat:css"]
        }
    }
};
