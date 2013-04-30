/*
 * Author: zhouweiping(Tiankui)
 * Email: eric.prototype@gmail.com
 * Data: 2013-04-27
 * It's distributed under the MIT license(http://mit-license.org).
 * 跟着红尘,跟着我浪迹一生
 */

var fs = require('fs');
var path = require('path');
module.exports = function(modulePath){
    try{
        var dataFile =  fs.readFileSync(path.join(modulePath,'data.json'),'utf8');
        return function (req, res, next) {
            req.data = JSON.parse(dataFile);
            next();
        };
    }catch(e){
        return function (req, res, next) {
            next();
        };
    }

};
