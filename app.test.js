const 
    express = require('express'),
    URL = require('./url.js');

let url = new URL("http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2019/first/second/last?query=ab&param=12");
console.log(url.getObject().absoluteString);
url.appendPathComponent("basecamp");
url.appendPathComponent("camp");
//url.absoluteString = "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2019/first/second/last/basecamp/camp?query=ab&param=12"
console.log(url.getObject().absoluteString);
url.deleteLastPathComponent();
console.log(url.getObject().absoluteString);
//url.absoluteString = "http://user_name: pass-word@boostcamp.connect-foundation.or.kr:2019/first/second/last/basecamp?query=ab&param=12"

var zumurl = new URL("http://admin@zum.com/#!/home?query=zum");

var naverurl = new URL("http://m.naver.com");

test('naverurl', () => {
    expect(naverurl.getIsInValid()).toBe(false);
});

var url1 = new URL("http://admin@zum.com/#!/home?query=zum");

test('url1', () => {
    expect(url1.getIsInValid()).toBe(true);
});

var url2 = new URL("http://admin@zum.com/#!/home");

test('url2', () => {
    expect(url2.getIsInValid()).toBe(true);
});

var url3 = new URL("http://admin@zum.com/?param=zum");

test('url3', () => {
    expect(url3.getIsInValid()).toBe(true);
});

var url4 = new URL("http://zum.com/#!/home");

test('url4', () => {
    expect(url4.getIsInValid()).toBe(true);
});

var pivot_url = new URL("http://user_name:pass-word@naver.com:123/abc");

// scheme부터 username, password, host:port까지 같은 상태
var test_url1 = "http://user_name:pass-word@naver.com:123/abc";
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