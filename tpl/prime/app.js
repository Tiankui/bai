/**
 * Module dependencies.
 */

//todo 引入bai项目node-modules里的express
var express = require('express'),
routes = require('./routes'),
user = require('./routes/user'),
http = require('http'),
autoopen = require('./middleware/autoOpenBrowser'),
path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 1217);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({
    dest: __dirname + '/public/stylesheets',
    src: __dirname + '/css_engines/less',
    prefix: '/stylesheets',
    compress: true
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Bai(使用express)开启了webserver在" + app.get('port'));
});

autoopen();
