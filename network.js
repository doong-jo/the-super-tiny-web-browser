const
    Request = require('./request.js'),
    Response = require('./response.js'),
    URL = require('./url.js'),
    net = require('net'),
    dns = require('dns'),
    fs = require('fs'),
    client = new net.Socket();

let 
    response,
    execRendering;
    
function browse(urlStr, render) {
    response = new Response();

    execRendering = render;

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
        client.write(req.stringify());
    });
}

function writeBodyInHTML() {
    fs.writeFile('./target.html', response.body.toString(), 'utf8', function(err) {
        console.log('write target.html');
        execRendering();
    });
}

client.on('data', function(data) {
    if( response.responseLine == "" ) {
        const decode = data.toString();

        const divHeader = decode.split("\r\n\r\n");
        response.setHeaders(divHeader[0]);
        response.concatToBody(divHeader[1]);
        
        console.log('----------responseLine-----------');
        console.log(response.headers);

        if( response.statusCode != "200" ) {
            writeBodyInHTML();
            client.destroy();
        }
    } else { 
        response.concatToBody(data);
    } 
});

client.on('end', function() {
    if( Buffer.byteLength(response.body, 'utf8') == response.contentLength ) {
        console.log('all data received');
    }
    
    writeBodyInHTML();
})

client.on('close', function() {
    console.log('Connection closed');
});

module.exports = { browse };