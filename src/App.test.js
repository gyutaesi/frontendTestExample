import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("React Testing Library", () => {
  render(<App />);

  // first item 타이핑
  const textfield = screen.getByRole("textbox");
  fireEvent.change(textfield, { target: { value: "first item" } });

  // 등록버튼 클릭
  const addBTn = screen.getByRole("button");
  fireEvent.click(addBTn);

  // first item 생겼는지 확인
  const firstItem = screen.getByText("first item");
  expect(firstItem).toBeInTheDocument();

  // 삭제버튼 클릭
  const deleteBtn = screen.getByRole("button", { name: "삭제" });
  fireEvent.click(deleteBtn);

  // 삭제되었는지 확인
  expect(firstItem).not.toBeInTheDocument();
});
