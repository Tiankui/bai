grunt = require('grunt');

module.exports = {
  pkg: grunt.file.readJSON("package.json"),
  appTasks:{
    common: ["less","concat:js","concat:css"],
    dev: ["server","watch"],
    dist: ["mincss","uglify:js"]
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
        "dist/js/app.min.js": "<%= files.js.concatenated %>"
      }
    }
  },

  mincss:{
    compress:{
      file:{
        "dist/css/app.min.css": "<%= files.css.concatenated %>"
      }
    }
  },

  less: {
    compile: {
      options: {
        paths: ["app/css/less"]
      },
      files: {
        "generated/css/app.less.css": "<%= files.less.app %>"
      }
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
    less:{
      files: "<%= files.glob.less.app %>",
      tasks: ["configure","less","configure","concat:css"]
    }
  }
};


