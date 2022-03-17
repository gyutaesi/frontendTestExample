// ./src/test/jest.config.js

module.exports = {
  // Root 디렉토리
  rootDir: "../../",

  // 테스트 코드 특정
  testMatch: ["**/?(*.)+(spec-img|test-img).js"],

  // 테스트 코드를 찾지 않을 경로
  testPathIgnorePatterns: ["/node_moduls"],

  // 테스트 타임아웃
  testTimeout: 600000,

  // 개별 테스트 결과 표시
  verbose: true,

  // 프리셋 (puppeteer 사용)
  preset: "jest-puppeteer",

  // 테스트 셋업 후 실행할 스크립트
  setupFilesAfterEnv: ["./src/test/jest.setup.js"],
};
