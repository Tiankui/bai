var grunt, fs, path;

grunt = require('grunt');
fs = require('fs');
path = require('path');

module.exports = (function(_,fs,grunt) {

  return _({}).tap(function(exports){

    exports.assetsFormat = function (src,assets) {
      _(fs.readdirSync(src)).each(function(filename){
        //排除隐藏文件夹以及".DS"文件
        if (filename.charAt(0) !== '.'){
          var file = fs.lstatSync(path.join(src,filename));

          if (file.isDirectory()){
            assets.dirs = assets.dirs || [];
            assets.dirs.push(path.join(src,filename));

          }else{
            assets.files = assets.files || [];
            assets.files.push(path.join(src,filename));
          }
        }
      });
      console.log(assets);
      if (assets.files)assets.files.sort();
      return assets;
    };
  });
}(grunt.util._, fs, grunt));


