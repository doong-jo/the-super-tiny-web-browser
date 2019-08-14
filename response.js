module.exports = class Response {
    constructor() {
        this.statusCode = 404;
        this.responseLine = "";
        this.contentLength = 0;
        this.headers = "";
        this.body = "";
    }

    setHeaders(header_data) {
        this.headers = header_data;

        header_data = header_data.split("\r\n");
        this.statusCode = header_data[0].trim().split(" ")[1];

        this.contentLength = header_data[4].trim().split(" ")[1];

        console.log('this.statusCode' , this.statusCode);
        console.log('this.contentLength' , this.contentLength);
    }

    setDataConcat(data) {
        this.body += data;
        this.contentLength = this.body.length;
    }
};