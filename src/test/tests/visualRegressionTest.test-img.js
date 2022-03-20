import { puppeteerInit, getSnapshotConfig } from "../test-utils";
import { getDocument, queries } from "pptr-testing-library";
// React-Testing-Library 와 같이 pptr-testing-library도 있어 dom 선택 시 사용 가능
// 단, pptr-testing-library로 찾은 component는 expect사용 불가

// expect 사용이 필요한 경우 puppeteer의 api 사용해야함
// https://github.com/puppeteer/puppeteer/blob/main/docs/api.md

let page, cleanUp;

beforeAll(async () => {
  // Puppeteer 초기화 및 콜백함수 가져오기
  let init = await puppeteerInit();

  page = init.page;
  cleanUp = init.cleanUp;
});

afterAll(async () => {
  // 종료 후 Puppeteer clear
  await cleanUp();
});

test("Visual Regression Test", async () => {
  // 제목이 나타날때까지 기다림 (로딩 기다림)
  await page.waitForSelector("h3");

  // Document 가져옴
  const document = await getDocument(page);

  // first item 타이핑
  const textfield = await queries.getByRole(document, "textbox");
  await textfield.type("first item");

  // 등록버튼 클릭
  const addBtn = await queries.findByRole(document, "button", { name: "등록" });
  await addBtn.click();

  // 아이템이 생길때까지 잠시 기다림
  // ripple 이펙트의 영향으로 diff 생기는 경우 있음
  await page.waitForTimeout(1000);

  // firstItem 찾기 (puppeteer api 사용)
  // toBeInTheDocument 등 사용 불가함
  // expect가 아닌 $eval에서 찾기 실패시에도 test 실패처리 되기 때문에, 실질적인 사용은 어려움이 있음
  let firstItem = await page.$eval("label", (item) => item.textContent);
  expect(firstItem).toBe("first item");

  // 스크린샷 찍기
  const img_test_1 = await page.screenshot({ fullPage: true });

  // Snapshot config에 정의한대로 이미지 비교하기
  let snapshotConfig = getSnapshotConfig("img_test_1");
  expect(img_test_1).toMatchImageSnapshot(snapshotConfig);

  // 삭제버튼 클릭
  const deleteBtn = await queries.getAllByRole(document, "button", {
    name: "삭제",
  });
  await deleteBtn[0].click();
  await page.waitForTimeout(1000);

  // 스크린샷 찍기
  const img_test_2 = await page.screenshot({ fullPage: true });

  // Snapshot config에 정의한대로 이미지 비교하기
  snapshotConfig = getSnapshotConfig("img_test_2");
  expect(img_test_2).toMatchImageSnapshot(snapshotConfig);
});

test("Mocking api test", async () => {
  // Puppeteer 에 Intereption을 가능하도록 하는 옵션
  await page.setRequestInterception(true);

  // 특정 API의 response를 강제로 변경하고, 나머지는 그대로 통과
  page.on("request", (request) => {
    if (
      request.url().startsWith("https://jsonplaceholder.typicode.com/todos")
    ) {
      request.respond({
        content: "application/json",
        body: JSON.stringify([
          { title: "first item" },
          { title: "second item" },
        ]),
      });
    } else {
      request.continue();
    }
  });

  // 페이지 새로고침
  await page.reload();

  // 제목이 나타날때까지 기다림 (로딩 기다림)
  await page.waitForSelector("h3");

  // 스크린샷 찍기
  const img_mock_test = await page.screenshot({ fullPage: true });

  // Snapshot config에 정의한대로 이미지 비교하기
  const snapshotConfig = getSnapshotConfig("img_mock_test");
  expect(img_mock_test).toMatchImageSnapshot(snapshotConfig);
});
