// ./src/test/jest.puppeteer.config.js

module.exports = {
  server: {
    // Jest 실행 시 서버 실행 (package.json 에 선언된 명령어 및 포트 사용)
    command: "npm run testdev",

    // 서버 포트번호
    port: 4321,

    // http 사용
    protocol: "http",

    // puppeteer 실행 타임아웃
    launchTimeout: 120000,

    // 디버그모드
    debug: true,
  },
};
