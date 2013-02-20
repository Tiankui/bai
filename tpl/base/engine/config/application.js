/* Exports an object that defines
 *  all of the configuration needed by the projects'
 *  depended-on grunt tasks.
 *
 * You can find the parent object in: node_modules/lineman/config/application.js
 */

module.exports = require('bai').config.extend('application', {
  //Override application configuration here. Common examples follow in the comments.

  // API Proxying
  //
  // During development, you'll likely want to make XHR (AJAX) requests to an API on the same
  // port as your lineman development server. By enabling the API proxy and setting the port, all
  // requests for paths that don't match a static asset in ./generated will be forwarded to
  // whatever service might be running on the specified port.
  //
  // server: {
  //   apiProxy: {
  //     enabled: true,
  //     host: 'localhost',
  //     port: 3000
  //   }
  // }
    appTasks:{
        common: ["less","configure","concat:js","concat:css"],
        dev: ["server","watch"],
        dist: ["concat:js","concat:css","mincss","uglify:js"]
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

    mincss:{
        compress:{
            file:{
                "dist/css/app.min.css": "<%= files.glob.css.concatenated %>"
            }
        }
    },

//细化
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
        less:{
            files: "<%= files.glob.css.app %>",
            tasks: ["less","concat:css"]
        }
    }
});