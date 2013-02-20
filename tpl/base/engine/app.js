//todo 引入bai项目node-modules里的express
var express = require('bai').config.express,
less = require('bai').config.less,
ejs = require('bai').config.ejs,
routes = require('./routes'),
http = require('http'),
autoopen = require('./middleware/autoOpenBrowser'),
path = require('path');

var app = express();

app.configure(function(){
  app.use(ejs);
  app.set('port', process.env.PORT || 1217);
  app.set('views', __dirname + '/../app/tpl');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(less({
    dest: __dirname + '../app/css',
    src: __dirname + '../app/less',
    prefix: 'stylesheets',
    compress: true
  }));
  app.use(express.static(path.join(__dirname, '../app/')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//路由表
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Bai(使用express)开启了webserver在 " + app.get('port'));
});

autoopen();
