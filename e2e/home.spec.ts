import { test, expect } from "@playwright/test";

test("home page renders RheumaLens heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "RheumaLens" })).toBeVisible();
});
