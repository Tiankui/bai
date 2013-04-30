var express = require('express'),
cluster = require('./lib/cluster'),
routes = require('./routes'),
config = require('./config.js'),
app = express();

//add ejs filters
require('./lib/ejsFiltersAddon')(require('ejs').filters);

// config
app.enable('trust proxy');
app.set('view engine', 'ejs');
app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());

app.use(app.router);
app.set('views', __dirname + '/views');
app.use(express.favicon(__dirname + '/app/img/favicon.png'));
app.use(express['static'](__dirname + '/app'));

app.set('env',config.mode);

routes(app);

cluster(function () {
  app.listen(config.port, function () {
    console.log("服务启动，监听端口：" + config.port);
  });
});
