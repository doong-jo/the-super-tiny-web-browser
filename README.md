# the-super-tiny-web-browser

## Intro
최소한의 브라우저 동작이 가능한 웹 브라우저입니다.

**Request -> Response -> Rendering(Chromium)** 의 동작 방식을 가집니다.

- URL class
  - 다음과 같은 속성을 가진다.
    - host : String
    - lastPathComponent : String
    - pathComponents : [String] //readonly
    - port : Int
    - query : String
    - scheme : String
    - isFileURL : Boolean
    - user : String
    - password : String
    - absoluteString : String (computed property
   - Regex를 이용하여 유효성을 검사
   - URL간 비교 가능
- Request class
  - 요청 방식(method) 변경 가능
  - header 추가 및 변경 가능
  - header정보를 stringify하여 host에 요청
- Response class
  - response 정보 구분하여 저장
  - content-length 비교

## Usage
```bash
# 실행
npm install
npm start
```

#### 예시

**상단의 입력 상자에 url을 입력 후 Enter 키를 누릅니다.**

![screenshot_2](https://github.com/doong-jo/the-super-tiny-web-browser/blob/master/screenshot_1.png?raw=true)
![screenshot_1](https://github.com/doong-jo/the-super-tiny-web-browser/blob/master/screenshot_2.png?raw=true)
