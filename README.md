> Factory Hunt Project with Nuxt.js

## Build Setup

```bash
# install dependencies
$ npm install # or yarn install

# serve with hot reload at localhost:3000
$ npm run dev # or yarn dev

# build for production and launch server
$ npm run build # or yarn build
$ npm start # or yarn start

# generate static project
$ npm run generate # or yarn generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## package.json

**@nuxtjs/google-analytics**

- google analytics integration

**@nuxtjs/sitemap**

- sitemap auto generation

**aws-sdk**

- to s3 connection
- 이건 세팅 되어있는 다른 서비스를 호출 다룰 수 있게 해주는 거고 세팅 하려면 aws-cli 를 설치해서 터미널에서 설정해줘야 함.
- aws-cli 설치하고 aws configure 하고 secret id 랑 넣어줘야 s3 작동한다.

**axios**

- http 통신

**body-parser**

- 서버에 post, delete put 등 데이터를 담아서 보냈을 때 req.body 로 받을 수 있게 해주는 라이브러리

**clipboard**

- 클립보드 저장시켜주는 라이브러리

**connect-redis**

- express-session 과 redis 를 연결시키는 라이브러리

**cookie-parser**

- 브라우저에 저장시킨 쿠키를 읽어보는 라이브러리

**cors**

- cross origin 오류 해결해주는 라이브러리

**cropperjs**

- 이미지 자르는 거

**dotenv**

- process.env 를 로컬 세팅을 위해

**elasticsearch**

**en-inflectors**

- 유사어, 동의어 찾아주는 라이브러리

**express**

- nodejs 프레임워크

**express-http-to-https**

- 프로토콜 강제로 바꾸는 거

**express-session**

- 서버에서 req.session 을 사용할 수 있게 해주는 라이브러리

**forcedomain**

- 서버가 반환하는 주소를 강제로 바꿔주는 거

**jquery**

**jsonwebtoken**

- 유저 정보 인증, 메일 보낼 때 등 데이터를 가지고 있는 토큰을 만들고 해석하는 라이브러리

**morgan**

- http 통신할 때 로깅 해주는 거

**multer**

- 클라에서 서버로 이미지 보낼 때 서버가 이미지 파일 읽을 수 있도록 해줌

**multer-s3**

- 서버가 받은 이미지를 s3 로 바로 저장시킬 수 있도록 해줌

**mysql**

**nodemailer**

- node 용 메일 보내는 라이브러리

**nodemon**

- 코드 바꾸거나 에러 발생하면 다시 앱 켜주는 라이브러리 (항상 다시 켜주는 것은 아님.)

**nuxt**

**pdfjs-dist**

- pdf 파일 자세하게 읽어주는 거

**push.js**

- 웹 브라우저에 알림 보낼 때 쓰는 거

**ramda**

- 자바스크립트 다룰 때 편하게 더 많은 기능들을 할 수 있게 해주는 거

**raven**

- sentry 라고 오류 체킹, 로깅 해주는거

**socket.io**

- 실시간 통신

**synonyms**

- 유사어 찾아주는 거

**vue-i18n**

- 번역 지원해야 할 때 쓰는거

**whatwg-fetch**

- Vuex 쓸 때 브라우저 대응 해주는 거
