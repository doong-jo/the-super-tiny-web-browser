Array.prototype.equals = function (array) {
    if (!array)
        return false;

    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            return false;   
        }           
    }       
    return true;
}

module.exports = class URL {
    constructor(url) {
        Object.assign(this, {
            invalid: false,

            host: "",
            lastPathComponent: "",
            pathComponents: [],
            port: 80,
            query: "",
            scheme: "",
            isFileURL: false,
            user: "",
            password: "",
            absoluteString: "", 
        });

        this.analysis(url);
    }

    // https://stackoverflow.com/a/5717133
    invalidURL(str) {
        // var format = /[!#*()+\[\];'"\\|<>]/;

        if(format.test(str)){
            return true;
        } else {
            return false;
        }
    }

    // TODO : write url regex
    analysis(url) {
        try {
            if( this.invalidURL(url) ) {
                this.invalid = true;
                throw new Error("invalid url error");
            }


        } catch (e) {
            console.log(e.message);
        }
    }

    appendPathComponent(c) {
        this.pathComponents.push(c);
        this.replaceAbsoluteString();
    }

    deleteLastPathComponent() {
        this.pathComponents.pop();
        this.replaceAbsoluteString();
    }

    replaceAbsoluteString() {
        const user_info = this.user !== '' ? `${this.user}:${this.user}` : '';
        const query = this.query !== '' ? `?${this.query}` : '';
        this.absoluteString = 
            `${this.schema}://${user_info}@${this.host}:${this.port}${this.pathComponents.join('/')}${query}`;
    }

    getIsInValid() {
        return this.invalid;
    }

    compareURL(com_url) {
        const com_o = com_url;
        let r_str = "";
        
        // 완벽하게 같은 상태
        if( 
            this.schema == com_o.schema &&
            this.user == com_o.user && this.password == com_o.password &&
            this.host == com_o.host && this.port == com_o.port &&
            this.pathComponents.equals(com_o.pathComponents) &&
            this.lastPathComponent == com_o.lastPathComponent &&
            this.query == com_o.query ) {
                r_str = "완벽하게 같은 상태";
        }

        // scheme부터 path까지만 모두 같은 상태
        else if( 
            this.schema == com_o.schema &&
            this.user == com_o.user && this.password == com_o.password &&
            this.host == com_o.host && this.port == com_o.port &&
            this.pathComponents.equals(com_o.pathComponents) ) {
            r_str = "scheme부터 path까지만 모두 같은 상태";
        }
        // scheme부터 username, password, host:port까지 같은 상태
        else if( 
            this.schema == com_o.schema &&
            this.user == com_o.user && this.password == com_o.password &&
            this.host == com_o.host && this.port == com_o.port ) {
            r_str = "scheme부터 username, password, host:port까지 같은 상태";
        }
        // scheme과 host:port만 같은 상태 (username, password 제외)
        else if( 
            this.schema == com_o.schema &&
            this.host == com_o.host && this.port == com_o.port ) {
            r_str = "scheme과 host:port만 같은 상태 (username, password 제외)";
        }
        else {
            r_str = "그 외 서로 다른 상태";
        }

        return r_str;
    }
};