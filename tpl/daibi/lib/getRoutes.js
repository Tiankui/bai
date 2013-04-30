/*
 * 路由处理方法
 * @param app express上下文
 * @param Rmod 模块对象
 */

module.exports = getRoutes;

var path = require('path'),
    FE = require('./FeTestService'),
    RD = require('./RdTestView');

function getRoutes (app, mod) {
  var modulePath;
  //加载模块的路由配置

  if (mod.info.path) {
    modulePath = mod.info.path;
  }else{
    console.error('routeModule path is not found!!');
    console.trace();
  }

  for (var route in mod.routes) {
    //处理方法的数组
    var processFuncArr = null,
        processFilePath,
        currentRoute,
        database,
        view;

    currentRoute = mod.routes[route];

    if(currentRoute.dir){//嵌套模块
      processFilePath = path.join(modulePath,currentRoute.dir);
      database = require(path.join(processFilePath,'database'));
      view = require(path.join(processFilePath,'view'));
      processFuncArr = [database,view];
    }else{//一级模块
      processFilePath = path.normalize(modulePath);
      processFuncArr = mod[route].func;
    }

    if(!processFuncArr) console.error(route+' 加载失败，route模块未编写');

    var _processFuncArr = [];

    //判断开发模式加载不同处理层
    switch(app.get('env')){
      case 'FE':
        _processFuncArr.push(FE(processFilePath),processFuncArr[processFuncArr.length-1]);
      break;
      case 'RD':
        _processFuncArr = processFuncArr;
        _processFuncArr.pop();
        _processFuncArr.push(RD);
      break;
      default:
        _processFuncArr = processFuncArr;
    }

    switch(currentRoute.method) {
      case 'get':
        app.get(route,_processFuncArr);
      break;
      case 'post':
        app.post(route, _processFuncArr);
      break;
      default:
        app.all(route, _processFuncArr);
    }
  }
}
