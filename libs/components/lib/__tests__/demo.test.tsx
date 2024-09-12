import { describe, expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import { sum, DemoButton } from "../components/DemoButton";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
    expect(sum(1, 2)).toBe(3);
  });
});

describe("DemoButton", () => {
  it("renders correctly", () => {
    const { getByText } = render(<DemoButton />);
    expect(getByText(/Click Me/i)).toBeTruthy();
  });
});
