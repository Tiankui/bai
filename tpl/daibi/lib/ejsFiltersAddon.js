module.exports = function (exports) {
  exports.truncate_ = function (str, len) {
    str = String(str);
    if (str.length > len) {
      return str.substr(0,len) + '...';
    }else{
      return str
    }
  }; 
};
