var index_routes = require('./index/routes');
var login_routes = require('./login/routes');
var getdata_routes = require('./getdata/routes');
exports.init = function(app){
	app.get('/', index_routes.index);
	app.get('/login', login_routes.login);
	app.get('/getdata', getdata_routes.getData);
}
