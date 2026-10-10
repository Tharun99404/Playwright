const { test, expect } = require('@playwright/test');

test('Automation Exercise signup flow', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  await page.waitForLoadState('domcontentloaded');

  await page.locator('a[href="/login"]').first().click();

  await page.locator('input[data-qa="signup-name"]').fill('Tharun');
  await page.locator('input[data-qa="signup-email"]').fill('tharun99404@gmail.com');
  await page.locator('button[data-qa="signup-button"]').click();

  await page.locator('input[data-qa="password"]').fill('Test@234');
  await page.locator('button[data-qa="create-account"]').click();

  await page.screenshot({
    path: 'test-results/signup-success.png',
    fullPage: true,
  });
});
