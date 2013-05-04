var grunt = require('grunt'),
    _ = grunt.util._,
    assetsFormat = require('../lib/assets.js'),
    path = require('path');

module.exports = (function(_,grunt,af) {
  return _({
    pkg: grunt.file.readJSON("package.json"),
    banner:"/*<%= pkg.name %>\n  author:<%= pkg.author %>\n  dependencies:Bai v<%= pkg.dependencies.bai %>\n  <%= grunt.template.today('yyyy-mm-dd') %>\n */\n",
    appTasks:{
      common: ["coffee","less:development","configure","concat:js","images:dev"],
      dev: ["server","watch"],
      dist: ["less:production","uglify"]
    },
    images: {
      files: {
        "<%= files.glob.base %>": "<%= files.glob.img.app %>"
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
      lib: {
        src: "<%= files.glob.lib %>"
      },
      dist: {
        src: ["<%= files.glob.js %>", "<%= files.glob.css %>"]
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
      less:{
        files: "<%= files.glob.less.app %>",
        tasks: ["less:development"]
      }
    }
  }).tap(function (exports) {
    var css = assetsFormat('app/css',{}),
    js = assetsFormat('app/js',{}),
    libjs = assetsFormat('app/lib/js',{});
    //data format: { dirs: [ 'app/js/detail', 'app/js/index' ],files: [ 'app/js/index.js', 'app/js/main.js' ] }
    exports.concat=(function(){
      var obj = {
        js:{files:{}}
      };
      if(js.files) obj.js.files['app/dist/js/base.js'] = js.files;
      if(js.dirs && js.dirs.length !== 0){
        _.each(js.dirs,function(item){
          obj.js.files['app/dist/js/' + path.basename(item) + '.js'] = item + '/*.js';
        });
      }
      return obj;
    })();

    exports.uglify = (function() {
      var obj = {},arr,libarr;
      arr = js.dirs||[];
      if (js.files) arr.push('app/dist/js/base.js');
      libarr = libjs.files;
      obj.options = {
        banner: "/* Bai Front-end engine */\n"
      };
      obj.development= {
        files:{}
      };
      _.each(arr,function(item){
        var filename = path.basename(item,'.js');
        obj.development.files['app/dist/js/'+filename + '.js'] = 'app/dist/js/' + filename + '.js';
      });

      obj.lib = {
        files:{}
      };
      _.each(libarr,function(item){
        var filename = path.basename(item,'.js');
        //console.log(!/\.min/.test(filename));
        if (!/\.min\./.test(item)) 
          obj.lib.files['app/lib/js/'+filename + '.min.js'] = 'app/lib/js/' + filename + '.js';
      });
      return obj;
    })();

    exports.less = (function() {
      var obj = {
        development:{
          options: {
            paths: ["app/css/"]
          },
          files: {}
        },
        production:{
          options: {
            paths: ["app/css/"],
            yuicompress: true
          },
          files: {}
        }
      };
      if (!!css.files) {
        _.each(css.files,function(item){
          obj.development.files['app/dist/css/' + path.basename(item) + '.css'] = item;
          obj.production.files['app/dist/css/' + path.basename(item) + '.css'] = item;
        });
      }
      return obj;
    })();
  });
}(_,grunt,assetsFormat));
