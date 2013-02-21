var extend;

extend = require("whet.extend");

module.exports = {
    config:{
        application:require("./config/application"),
        files:require("./config/files"),
        grunt:require("./config/grunt"),
        ejs:require("ejs"),
        extend:function (key, stuff) {
            return extend(true, {}, module.exports.config[key], stuff);
        }
    }
};

