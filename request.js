module.exports = class Request {
    constructor(host, schema, path) {
        this.host = host;
        this.schema = schema;
        this.path = path;

        // Reference : https://goddaehee.tistory.com/169
        this.header = {
        };
        
        this.method = 'GET';
        this.connection = 'keep-alive';
    }

    setHeader(name, value) {
        this.header[name] = value;
        for(const name in this.header) {
            r = `${name}: ${this.header[name]}\r\n` + r;
        }
    }

    setMethod(method = 'GET') {
        this.method = method;
    }

    stringify() {
        const _path = this.path.join('/');

        let r = 
           `${this.method} ${_path} HTTP/1.1\r\n` +
           `Host: ${this.host}\r\n`+
           "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0\r\n" +
           "Accept: text/html\r\n"+
           "Accept-Language: ko-KR,ko;q=0.9,pt;q=0.8\r\n" +
           "Accept-Encoding: utf-8\r\n" +
           "Connection: keep-alive\r\n" +
           "\r\n";

        

        console.log('---------------request-----------------');
        console.log(r);

        return r;
    }
};