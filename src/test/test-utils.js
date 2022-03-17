// ./src/test/test-utils.js

import puppeteer from "puppeteer";

const puppeteerInit = async () => {
  const browser = await puppeteer.launch({
    // headless 모드
    // headless 모드를 끄고 켰을때 image에 diff가 생기는 버그가 있음. debug 용도가 아니라면 고정 필요
    headless: false,
    // 브라우저 실행 타임아웃
    timeout: 120000,
    // Chrome 개발자도구
    devtools: false,
    // 디버깅을 위해 천천히 동작시키는 모드
    // slowMo: 100,
    // CORS를 위한 params (Mock api 사용한다면 필요하지 않음)
    args: [
      "--disable-web-security",
      "--disable-features=Is음lateOrigins",
      "--disable-site-isolation-trials",
    ],
  });

  // 새 페이지 열기
  const page = await browser.newPage();

  // index 페이지 로드
  const response = await page.goto("http://localhost:4321");

  // 페이지 정상 로드 확인
  expect(response.status()).toBe(200);

  // 페이지 로드 완료 확인 (React App.js의 root)
  await page.waitForSelector("#root");

  // 종료시 프로세스 종료를 위한 콜백을 함께 리턴
  return {
    page,
    async cleanUp() {
      await page.close();
      await browser.close();
    },
  };
};

const getSnapshotConfig = (imageName) => {
  return {
    customSnapshotIdentifier: imageName,
    customSnapshotsDir: "src/test/tests/__image_snapshots__/__snap_output__",
    customDiffDir: "src/test/tests/__image_snapshots__/__diff_output__",
  };
};

export { puppeteerInit, getSnapshotConfig };
