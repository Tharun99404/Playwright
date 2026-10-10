const { test, expect } = require('@playwright/test');

test('search for a product and validate results', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');

  await page.locator('input#search_product').fill('Blue Top');
  await page.locator('button#submit_search').click();

  const productResult = page.locator('.productinfo').filter({ hasText: 'Blue Top' }).first();
  await expect(productResult).toBeVisible();
});
