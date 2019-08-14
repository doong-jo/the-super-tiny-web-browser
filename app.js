const
    express = require('express'),
    dns = require('dns'),
    net = require('net'),
    client = new net.Socket();

    port = 9000,

    Request = require('./request.js'),
    Response = require('./response.js'),
    response = new Response(),
    URL = require('./url.js');

process.stdout.write("Input URL : ");
process.stdin.on("data", function (input) {
    const s = input.toString().trim();
    searchDNS(s);
}.bind(this));

// searchDNS('http://m.naver.com');
// searchDNS('http://zum.com');

function searchDNS(url) {
    const target = new URL(url);
    const { host, port } = target.getObject();

    dns.lookup(host, (err, ip) => {
        if (err) throw err;
        console.log('DNS FIND IP : ' + ip);

        connectSocket(ip, port, target);
    });
}

function connectSocket(ip, port, url) {
    client.connect({ port, host: ip }, function () {
        console.log('CONNECT SUCCESS'); 

        const { schema, host, pathComponents } = url.getObject();
        console.log(pathComponents);
        console.log(pathComponents);
        console.log(pathComponents);
        const req = new Request(host, schema, pathComponents);

        client.write(req.stringify());
    });
}

client.on('data', function(data) {
    response.setDataConcat(data);
    
    if( response.responseLine == "" ) {
        const decode = data.toString();

        response.responseLine = decode.split('\n')[0];
        console.log('response.responseLine', response.responseLine);
        response.setHeaders(decode.split("<!DOCTYPE html>")[0]);
        console.log('----------responseLine-----------');
        console.log(response.headers);
    }
});

client.on('close', function() {
    console.log('Connection closed');

    console.log('-----response data-----');
    console.log(response.body.toString());
    console.log('response.body.length', response.body.length);
    console.log('content_length', response.contentLength);
    console.log('response.body.length == content_length', response.body.length == response.contentLength);
});