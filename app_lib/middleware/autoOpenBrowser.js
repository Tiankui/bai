//打开默认浏览器,目前支持MAC

var exec = require('child_process').exec;

function autoOpen (){
  if (require('os').type().toUpperCase()==='DARWIN') {
    exec('open http://0.0.0.0:1217',function(error,stdout,stderr){
      if (error !== null) {
        console.log('打开浏览器出错: ' + error);
      }
    });
  }
}

module.exports = autoOpen;
