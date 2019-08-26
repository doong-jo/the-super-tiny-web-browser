const 
    URL = require('./url.js');

let url = new URL("http://user_name:pass-word@naver.com:2019/first/second/last?query=ab&param=12");
console.log(url.absoluteString);

console.log('add \"basecamp\" path');
url.appendPathComponent("basecamp");
console.log('add \"camp\" path');
url.appendPathComponent("camp");

//url.absoluteString = "http://user_name:pass-word@naver.com:2019/first/second/last/basecamp/camp?query=ab&param=12"
console.log(url.absoluteString);
console.log('delete path');
url.deleteLastPathComponent();
console.log(url.absoluteString);

var vaild_test_1 = new URL("http://m.naver.com");
test('http://m.naver.com', () => {
    expect(vaild_test_1.getIsInValid()).toBe(false);
});

var vaild_test_2 = new URL("http://.com");
test('http://.com', () => {
    expect(vaild_test_2.getIsInValid()).toBe(true);
});

var vaild_test_3 = new URL("://m.naver.com");
test('://m.naver.com', () => {
    expect(vaild_test_3.getIsInValid()).toBe(true);
});

var vaild_test_4 = new URL("hi://m.naver.com");
test('hi://m.naver.com', () => {
    expect(vaild_test_4.getIsInValid()).toBe(true);
});


var pivot_url = new URL("http://user_name:pass-word@naver.com:123/abc");

// scheme부터 username, password, host:port까지 같은 상태
var test_url1 = "http://user_name:pass-word@naver.com:123";
console.log(pivot_url.compareURL(new URL(test_url1)));

// scheme과 host:port만 같은 상태 (username, password 제외)
var test_url2 = "http://naver.com:123";
console.log(pivot_url.compareURL(new URL(test_url2)));

// scheme부터 path까지만 모두 같은 상태
var test_url3 = "http://user_name:pass-word@naver.com:123/abc?query=ab";
console.log(pivot_url.compareURL(new URL(test_url3)));

// 완벽하게 같은 상태
var test_url4 = "http://user_name:pass-word@naver.com:123/abc";
console.log(pivot_url.compareURL(new URL(test_url4)));

// 그 외 서로 다른 상태
var test_url5 = "http://abc.com";
console.log(pivot_url.compareURL(new URL(test_url5)));
