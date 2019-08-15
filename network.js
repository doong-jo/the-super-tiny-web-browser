const
    Request = require('./request.js'),
    Response = require('./response.js'),
    URL = require('./url.js'),
    net = require('net'),
    dns = require('dns'),

    response = new Response(),
    client = new net.Socket();
    
function browse(urlStr) {
    const url = new URL(urlStr);
    if( url.getIsInValid() ) {
        new Error("FAIL BROWSING (INVALID URL)");
    }

    dns.lookup(url.host, (err, ip) => {
        if (err) throw err;
        console.log('FOUND DNS! -> ' + ip);

        connectSocket(ip, url);
    });
}

function connectSocket(ip, url) {
    const { schema, host, port, pathComponents } = url;

    client.connect({ port, host: ip }, function () {
        console.log('CONNECT SOCKET SUCCESSFUL'); 
        const req = new Request(host, schema, pathComponents);
        req.setHeader("Connection", "close");
        req.setHeader("Content-Type", "text/html;charset=UTF-8");
        client.write(req.stringify());
    });
}

client.on('data', function(data) {
    if( response.responseLine == "" ) {
        const decode = data.toString();
        response.setHeaders(decode.split("\r\n\r\n")[0]);

        console.log('----------responseLine-----------');
        console.log(response.headers);
    } else { 
        response.concatToBody(data);
    } 
});

client.on('close', function() {
    console.log('Connection closed');

    console.log('-----response data-----');
    console.log(response.body.toString());
});

module.exports = { browse };