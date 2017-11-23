const http = require('http');

http.createServer(function (request, response) {

  // console.info(request)

  response.end(JSON.stringify({
    status: 1,
    message: "xxxxx"
  }));


}).listen(6002);

console.log('Server running at http://127.0.0.1:6002/');