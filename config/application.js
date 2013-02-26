var grunt = require('grunt'),
_ = grunt.util._,
assetsFormat = require('../lib/assets.js').assetsFormat,
path = require('path');

module.exports = (function(_,grunt,af) {
  return _({
    pkg: grunt.file.readJSON("package.json"),
    banner:"/*<%= pkg.name %>\n  author:<%= pkg.author %>\n  dependencies:Bai v<%= pkg.dependencies.bai %>\n  <%= grunt.template.today('yyyy-mm-dd') %>\n */\n",
    appTasks:{
      common: [/*"coffee",*/"less","configure","concat:js","images:dev"],
      dev: ["server","watch"],
      dist: ["uglify","cssmin"]
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
        port: 1217
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
        tasks: ["configure","less"]
      },
      coffee:{
        files: "<%= files.glob.coffee.app %>",
        tasks: ["coffee","concat:js"]
      },
      less:{
        files: "<%= files.glob.less.app %>",
        tasks: ["less","less"]
      }
    }
  }).tap(function (exports) {
    var css = assetsFormat('app/css',{}),
    js = assetsFormat('app/js',{});

    exports.concat=(function(){
      var obj = {
        js:{files:{}}
      };
      obj.js.files['generated/js/base.js'] = js.files;
      if(js.dirs && js.dirs.length !== 0){
        _.each(js.dirs,function(item){
          obj.js.files['generated/js/' + path.basename(item) + '.js'] = item + '/*.js';
        });
      }
      return obj;
    })();

    exports.uglify = (function() {
      var obj = {},arr;
      arr = js.dirs||[];
      arr.push('generated/js/base.js');
      _.each(arr,function(item){
        var filename = path.basename(item,'.js');
        obj[filename] = {
          option:{
            banner: "Bai Front-end engine"
          },
          files:{}
        };
        obj[filename].files ['dist/js/'+filename + '.min.js'] = 'generated/js/' + filename + '.js';
      });
      console.log(obj);
      return obj;
    })();

    exports.less = (function() {
      var obj = {
        compile:{
          options: {
            paths: ["app/css"]
          },
          files: {}
        }

      };
      obj.compile.files['generated/css/base.css'] = css.files;
      if (css.dirs && css.dirs.length !== 0) {
        _.each(css.dirs,function(item){
          obj.compile.files['generated/css/' + path.basename(item) + '.css'] = item + '/*.less';
        });
      }
      return obj;
    })();

    exports.cssmin = (function() {
      var obj = {
        compress:{
          files:{}
        }
      };
      //tofix

      var arr = css.dirs || [];
      arr.push('generated/css/base.css');
      _.each(arr,function (item) {
        var filename = path.basename(item,'.css');
        console.log(filename);
        obj.compress.files['dist/css/' + filename + '.min.css'] = 'generated/css/' + filename + '.css';
      });

      return obj;
    })();
  });
}(_,grunt,assetsFormat));
