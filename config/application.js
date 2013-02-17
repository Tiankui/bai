grunt = require('grunt');

module.exports = {
  pkg: grunt.file.readJSON("package.json"),

  apptasks:{
    common: ["less","concat:js","concat:css"],
    dev: ["server","watch"],
    dist: ["mincss","uglify:js"]
  },

  //压缩
  uglify:{
    js:{
      option:{
        banner: "<%= meta.banner %>"
      },
      files:{
        "dist/js/app.min.js": "%= files.js.concatenated %"
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
        paths: ["css_engines/less"]
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
      files: ["<%= files.glob.js.vendor %>","<%= files.glob.js.app %>"],
      tasks: ["configure", "concat:js"]
    },
    less:{
      files: "<%= files.glob.less.app %>",
      tasks: ["configure","less","configure","concat:css"]
    }
  }

};

