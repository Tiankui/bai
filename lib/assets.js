/*
 * Author: zhouweiping(Tiankui)
 * Email: eric.prototype@gmail.com
 * Data: 2013-04-29
 * It's distributed under the MIT license(http://mit-license.org).
 */
var grunt = require('grunt'),
    fs = require('fs'),
    path = require('path');

module.exports = function (src,assets) {
  fs.readdirSync(src).forEach(function(filename){
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
  if (assets.files)assets.files.sort();
  return assets;
};
