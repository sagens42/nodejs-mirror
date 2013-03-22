var http = require('http');
var url = require('url');

var port = (process.env.PORT || 3000);

http.createServer(function (request, response) {
	console.log('Serving ' + request.url);
	var reqHeaders = request.headers;
	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;
	var host = (query['host'] || 'www.colourlovers.com');
	var img = query['img'];
	reqHeaders['host'] = host;
	var options = {
		host: host,
		port: 80,
		path: request.url,
		method: 'GET',
		headers: reqHeaders
	};
	if (typeof img != "undefined") {
		options.path = img;
	}
	console.log('Sending req ' + JSON.stringify(options));
	var req = http.get(options, function(res) {
		var headers = res.headers;
		headers["Access-Control-Allow-Origin"] = '*';
		response.writeHead(res.statusCode, headers);
		res.on('data', function (chunk) {
			console.log("data!");
			response.write(chunk);
			response.end();
		});
	}).on('error', function(err) {
		console.log("Got error: " + err.message);
	});
	req.end();
}).listen(port);