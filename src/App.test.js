import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

test("React Testing Library", async () => {
  render(<App />);

  await screen.findByText("Todo List");

  // first item 타이핑
  const textfield = screen.getByRole("textbox");
  fireEvent.change(textfield, { target: { value: "first item" } });

  // 등록버튼 클릭
  const addBTn = screen.getByRole("button", { name: "등록" });
  fireEvent.click(addBTn);

  // first item 생겼는지 확인
  const firstItem = screen.getByText("first item");
  expect(firstItem).toBeInTheDocument();

  // 첫번째 삭제버튼 클릭
  const deleteFirstBtn = screen.getAllByRole("button", { name: "삭제" })[0];
  fireEvent.click(deleteFirstBtn);

  // 삭제되었는지 확인
  expect(firstItem).not.toBeInTheDocument();
});

test("Mocking api test", async () => {
  const mock = new MockAdapter(axios, { delayResponse: 100 }); // 200ms 딜레이 설정

  mock.onGet("https://jsonplaceholder.typicode.com/todos").reply(200, [
    {
      title: "first item",
    },
    {
      title: "second item",
    },
  ]);

  render(<App />);

  await screen.findByText("Todo List");

  expect(screen.getByText("first item")).toBeInTheDocument();
  expect(screen.getByText("second item")).toBeInTheDocument();
});
