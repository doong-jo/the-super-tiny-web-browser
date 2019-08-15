module.exports = class Request {
    constructor(host, schema, path) {
        this.host = host;
        this.schema = schema;
        this.path = path;
        
        this.header = {
            "Host": this.host,
            "Accept-Encoding": "utf-8",
        };
        
        this.method = 'GET';
    }

    setHeader(name, value) {
        this.header[name] = value;
    }

    setMethod(method = 'GET') {
        this.method = method;
    }

    stringify() {
        let joinPath = this.path.join('/');
        joinPath = joinPath === "" ? "/" : joinPath;
        const requestLine = `${this.method} ${joinPath} HTTP/1.1\r\n`;

        let r = requestLine;

        for(const name in this.header) {
            r += `${name}: ${this.header[name]}\r\n`;
        } r += '\r\n';
        
        console.log('---------------request-----------------');
        console.log(r);

        return r;
    }
};