var http = require('http');
//
exports.getData = function(req, res){
	console.log(req.header('Cookie'));
	var serverReqOpts = {
			host : 'localhost',
			port : 8080,
			//path : '/news/searchNewsIndex.do',
			path:'/workflow/customize/hospitalLevel01Suggestion.do?q=东城',
			method : 'POST',
			headers:{
				'Cookie':req.header('Cookie')
			}
		};
	
	var serverReq = http.request(serverReqOpts, function(serverRes) {
		console.log('STATUS: ' + serverRes.statusCode);
		console.log('HEADERS: ' + JSON.stringify(serverRes.headers));
		serverRes.setEncoding('utf8');
		var serverResData = "";
		serverRes.on('data', function(chunk) {
			serverResData +=chunk;
			
		});
		serverRes.on('end',function(chunk){
			res.json(200, serverResData);
		});
		
	});
	// write data to request body
	serverReq.write("\n");
	serverReq.end();
	// res.render('index', { title: 'Express' });
};
