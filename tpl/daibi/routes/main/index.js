//必须添加否则影响fe与rd模式
exports.info = {
  path:__dirname
};
/*注册该模块下所有的路由
 * key：路由路径
 * method：请求方式 POST|GET
 * dir: 指定处理模块的controller
 * func: 单层文件夹的执行函数
 *
 * */
exports.routes = {
  //首页
  '/': {method: 'get', dir:'./main'}
  //"/": {method: "get", func:[server,view]}
};
