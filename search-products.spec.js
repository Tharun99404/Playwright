const { test, expect } = require('@playwright/test');

test('search products by keyword', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');

  await page.locator('input#search_product').fill('Dress');
  await page.locator('button#submit_search').click();

  const searchResults = page.locator('.product-image-wrapper');
  await expect(searchResults.filter({ hasText: 'Dress' }).first()).toBeVisible();
  await expect(searchResults.filter({ hasText: 'Blue Top' })).toHaveCount(0);
});
