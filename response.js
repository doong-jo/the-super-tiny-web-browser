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
        this.responseLine = header_data[0];
        this.statusCode = header_data[0].trim().split(" ")[1];
        this.contentLength = header_data[4].trim().split(" ")[1];
    }

    concatToBody(data) {
        this.body += data;
    }
};