import test from "@playwright/test";
import { chromium } from "@playwright/test";

test("Browser Launch", async () => {

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.omrbranch.com/");

  console.log("title :", await page.title());
  console.log("url :", await page.url());

  await page.waitForTimeout(3000);
  
  const element = page.locator("email");
  const felement = element.first
})