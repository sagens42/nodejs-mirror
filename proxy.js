var http = require('http'),
httpProxy = require('http-proxy');
var url = require('url');
httpProxy.createServer(function (request, response, proxy) {
 	//console.log('Serving ' + request.url);
	var reqHeaders = request.headers;
	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;
	var host = (query['host'] || 'www.colourlovers.com');
	var img = query['img'];
	request.headers['Host'] = host;
	if (typeof img != "undefined") {
		request.url = img;
	}
	//console.log(JSON.stringify(reqHeaders));
	response.oldWriteHead = response.writeHead;
	response.writeHead = function(statusCode, headers) {
    	headers = (headers || { });
    	headers['Access-Control-Allow-Origin'] = '*';

    	response.oldWriteHead(statusCode, headers);
  	}
	proxy.proxyRequest(request, response, { target: {
    	port : 80, 
    	host : host,
  	}, changeOrigin: true });
}).listen(process.env.PORT || 3000);