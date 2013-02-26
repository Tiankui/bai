/*
Configuration:
"base" - 静态服务器开启的文件夹
"web.port" - 服务器端口
"apiProxy.port" - 代理服务器端口
"apiProxy.enabled" - 代理服务器开关
"apiProxy.host" - 代理服务器地址
*/

module.exports = function(grunt) {
  var apiProxy, express, httpProxy, loadConfigurationFile, _;
  _ = grunt.util._;

  express = require("express");
  httpProxy = require("http-proxy");
  loadConfigurationFile = require("./../lib/file-utils").loadConfigurationFile;

  grunt.registerTask("server", "静态文件和后台API代理服务器", function() {
    grunt.log.writeln('运行本地服务器'.warn);
    var apiPort, apiProxyEnabled, apiProxyHost, app, userConfig, webPort, webRoot;

    apiPort = process.env.API_PORT || grunt.config.get("server.apiProxy.port") || 3000;
    apiProxyEnabled = grunt.config.get("server.apiProxy.enabled");
    apiProxyHost = grunt.config.get("server.apiProxy.host") || "localhost";
    webPort = process.env.WEB_PORT || grunt.config.get("server.web.port") || 1217;
    webRoot = grunt.config.get("server.base") || "generated";
    userConfig = loadConfigurationFile("server");
    app = express();

    //加载用户自定义的express配置
    if (userConfig.expressConfig) {
      userConfig.expressConfig(app,express);
    }
    //是否开启数据模拟接口
    if (userConfig.drawRoutes) {
      userConfig.drawRoutes(app);
    }

    app.configure(function() {

      //开启静态服务器
      app.use(express["static"]("" + (process.cwd()) + "/" + webRoot));
      app.use(express["static"]("" + (process.cwd()) + '/app'));

      //是否打开代理
      if (apiProxyEnabled) {
        app.use(apiProxy(apiProxyHost, apiPort, new httpProxy.RoutingProxy()));
      }

      return app.use(express.errorHandler());
    });

    grunt.log.writeln("静态服务器地址:" + ("http://localhost:" + webPort).warn);

    if (apiProxyEnabled) {
      grunt.log.writeln("代理服务器: " + apiProxyHost + ":" + apiPort);
    }

    return app.listen(webPort);
  });

  apiProxy = function(host, port, proxy) {
    proxy.on("proxyError", function(err, req, res) {
      res.statusCode = 500;
      res.write("代理错误! `" + req.url + "` 详细错误: `" + (err.toString()) + "`");
      return res.end();
    });
    return function(req, res, next) {
      return proxy.proxyRequest(req, res, {
        host: host,
        port: port
      });
    };
  };
};
