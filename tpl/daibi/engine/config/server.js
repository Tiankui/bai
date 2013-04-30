/**
 * Copyright(c) 2013 BJ Tiankui <eric.prototype@gmail.com>
 * 本子server配置
 */
var routers,ejs;

routers = module.exports.routers = ['/index','/detail'];
ejs = require('./../../node_modules/bai').config.ejs;


module.exports = {

  expressConfig: function (app,express) {
    app.configure(function () {
      app.use(ejs);
      app.set("view engine","ejs");
      app.set('views', (process.cwd() + '/app/views'));
      app.use(express.logger('dev'));
      app.use(express.bodyParser());
      app.use(express.methodOverride());
    });
  },

  drawRoutes: function(app) {
    app.get('/api/greeting/:message', function(req, res){
      res.json({ message: "OK, "+req.params.message });
    });
    app.get('/', function(req, res){
      res.render('',{title:"Bai Fe Engine"});
    });
    routers.forEach(function(item){
      app.get(item,function(req,res){
        res.send('')
        //res.render(item.substring(1),{title:"Bai FE Engine"});
      });
    });
  }
};
