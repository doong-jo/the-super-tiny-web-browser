const { comparePropertyValue } = require('./util.js');

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

const INDEX_OF_PARSED_URL = {
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

    // 참고 : https://stackoverflow.com/a/5717133
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

        return regexArr;
    }

    setURLData(regexArr, url) {
        this.scheme = regexArr[INDEX_OF_PARSED_URL.SCHEME];
        this.www = regexArr[INDEX_OF_PARSED_URL.WWW] || this.www;
        this.isFileURL = this.scheme == "file" || false;
        this.host = regexArr[INDEX_OF_PARSED_URL.HOST];
        this.port = regexArr[INDEX_OF_PARSED_URL.PORT] || this.port;
        this.query = regexArr[INDEX_OF_PARSED_URL.QUERY] || this.query;
        this.absoluteString = url;

        if( regexArr[INDEX_OF_PARSED_URL.USER_INFO] ) {
            const user_info = regexArr[INDEX_OF_PARSED_URL.USER_INFO].split(":");
            console.log('user_info', user_info);
            if( user_info.length > 1 ) { 
                this.user = user_info[0];
                this.password = user_info[1].slice(0, -1);
            } else {
                this.user = user_info[0].slice(0, -1);
            }
        }
        
        if( regexArr[INDEX_OF_PARSED_URL.PATH] ) {
            this.pathComponents = regexArr[INDEX_OF_PARSED_URL.PATH].split("/");
            this.pathComponents.shift(); // remove blank

            this.lastPathComponent = this.pathComponents[this.pathComponents.length - 1];
        }
    }
    

    analysis(url) {
        try {
            const regexArr = this.validCheck(url);
            this.setURLData(regexArr, url);
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
        
        const conditionState = [
            { 
                properties : ['scheme', 'user', 'host', 'pathComponents', 'lastPathComponent', 'query'], 
                outputStr : "완벽하게 같은 상태"
            },
            { 
                properties : ['scheme', 'user', 'host', 'pathComponents'], 
                outputStr : "scheme부터 path까지만 모두 같은 상태"
            },
            { 
                properties : ['scheme', 'user', 'password', 'host', 'port'], 
                outputStr : "scheme부터 username, password, host:port까지 같은 상태"
            },
            { 
                properties : ['scheme', 'host', 'port'], 
                outputStr : "scheme과 host:port만 같은 상태 (username, password 제외)"
            }
        ]


        for(let cond of conditionState) {
            if( r_str = comparePropertyValue( 
                    cond.properties, 
                    this, com_o,
                    cond.outputStr) 
                ) {
                return r_str;
            }
        }

        return r_str;
    }
};
