import { test, expect } from "@playwright/test";
test.describe("Base page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    test.info().annotations.push({
      type: "browser version",
      description: `Done at ${new Date().toISOString()}`,
    });
  });
  // test.beforeEach(async () => {
  //   console.log(">>> beforeEach");
  // });
  test(
    "has title",
    {
      annotation: [
        {
          type: "issue",
          description: "https://github.com/microsoft/playwright/issues/23180",
        },
        {
          type: "gong",
          description: "walla?",
        },
      ],
    },
    async ({ page }) => {
      await page.goto("http://localhost:5173/");

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle("Vite + React + TS");
      // await expect(page).toHaveTitle(/Vite + React + TS/);
    }
  );

  test("has Miro @lala", { tag: "@miro" }, async ({ page }) => {
    await page.route("https://get.geojs.io/v1/ip/country.json", (route) => {
      route.fulfill({
        status: 200, // HTTP status code
        contentType: "application/json", // Content-Type header
        body: JSON.stringify({ msg: "lala" }), // Mock response body
      });
    });
    await page.goto("http://localhost:5173/");
    await new Promise((r) => setTimeout(r, 1000));

    const link = page.getByRole("link", { name: "Miro", exact: true });
    // console.log(">>> pre: ", await link.getAttribute("aria-current"));
    await link.click();
    expect(await link.getAttribute("aria-current")).toBe("page");
    // console.log(
    //   "*** mmm: ",
    //   // await link.textContent(),
    //   // await link.getAttribute("dataset"),
    //   // await link.evaluate((el) => el.dataset),
    //   await link.getAttribute("data-status")
    // );
    await expect(page.getByText("Hello /index/miro!")).toBeVisible();
    await expect(page.locator('text="Miro"')).toBeVisible();
    await expect(link).toHaveAttribute("data-status", "active");
    await expect(link).toHaveAttribute("aria-current", "page", {
      timeout: 100,
    });
    await expect(page).toHaveURL("http://localhost:5173/miro", {
      timeout: 100,
    });
    // expect(page.url()).toBe("http://localhost:5173/miro");
  });
});
