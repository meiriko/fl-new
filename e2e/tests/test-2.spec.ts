import { test, expect } from "@playwright/test";

test("recorded test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page
    .getByRole("link", { name: "miro/xx/tab:here", exact: true })
    .click();
  await page.goto("http://localhost:5173/");
  await page
    .getByRole("link", { name: "miro/xx/tab:here", exact: true })
    .click();
  await page.getByRole("link", { name: "was", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "was", exact: true })
  ).toContainText("wa");
});
