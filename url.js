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

const REGEX = {
    SCHEME: 1,
    WWW: 2,
    USER_INFO: 3,
    HOST: 4,
    PORT: 5,
    PATH: 6,
    QUERY: 7,
};

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

            www: "",
        });
        
        this.analysis(url);
    }

    // https://stackoverflow.com/a/5717133
    validCheck(url) {
        const regex = /(https?|file):\/\/(www\.)?([a-zA-Z0-9-:!#$%^&*()_+=-]*?[@])?([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)[:]?([0-9]*)?([-a-zA-Z0-9()@:%_\+.~#/=]*)?[?]?([-a-zA-Z0-9()@:%_\+.~#=?&]*)/g;

        if( !url.match(regex) ) {
            throw new Error("invalid url error (no match)");
        }

        const regexArr = regex.exec(url);
        /*
            example
            url = "http://www.user_name:pass-word@naver.com:2019/first/second/last?query=ab&param=12"
            [ 
                'http://www.user_name:pass-word@naver.com:2019/first/second/last?query=ab&param=12',
                'http',
                'www.',
                'user_name:pass-word@',
                'naver.com',
                '2019',
                '/first/second/last',
                'query=ab&param=12',
                index: 0,
                input: 'http://www.user_name:pass-word@naver.com:2019/first/second/last?query=ab&param=12',
                groups: undefined 
            ]
        */
        
        this.scheme = regexArr[REGEX.SCHEME];
        this.www = regexArr[REGEX.WWW] ? regexArr[REGEX.WWW] : this.www;
        this.isFileURL = this.scheme == "file" ? true : false;
        this.host = regexArr[REGEX.HOST];
        this.port = regexArr[REGEX.PORT] ? regexArr[REGEX.PORT] : this.port;
        this.query = regexArr[REGEX.QUERY] ? regexArr[REGEX.QUERY] : this.query;
        this.absoluteString = url;

        if( regexArr[REGEX.USER_INFO] ) {
            const user_info = regexArr[REGEX.USER_INFO].split(":");
            console.log('user_info', user_info);
            if( user_info.length > 1 ) { 
                this.user = user_info[0];
                this.password = user_info[1].slice(0, -1);
            } else {
                this.user = user_info[0].slice(0, -1);
            }
        }
        
        if( regexArr[REGEX.PATH] ) {
            this.pathComponents = regexArr[REGEX.PATH].split("/");
            this.pathComponents.shift(); // remove blank

            this.lastPathComponent = this.pathComponents[this.pathComponents.length - 1];
        }

        this.invalid = false;
    }

    analysis(url) {
        try {
            this.validCheck(url);
        } catch (e) {
            this.invalid = true;
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
        const user_info = this.user !== '' ? `${this.user}:${this.password}` : '';
        const query = this.query !== '' ? `?${this.query}` : '';
        this.absoluteString = 
            `${this.scheme}://${this.www}${user_info}@${this.host}:${this.port}/${this.pathComponents.join('/')}${query}`;
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
