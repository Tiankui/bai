var CAS = require('cas');
var cas = new CAS({
	base_url : 'https://itebeta.baidu.com/',
	service : 'http://localhost:3000/',
	version : 2.0
});


exports.login = function(req,res){
	cas.authenticate(req, res, function(err, status, username, extended) {
		if (err) {
			res.redirect('/');
		} else {
			res.redirect(307, 'http://localhost:8080/home/login.do');
		}
	});
};