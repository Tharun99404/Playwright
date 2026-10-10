const { test, expect } = require('@playwright/test');

test('search for a product and validate the filtered results', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');

  await page.locator('input#search_product').fill('Blue Top');
  await page.locator('button#submit_search').click();

  const resultCards = page.locator('.product-image-wrapper');
  await expect(resultCards.filter({ hasText: 'Blue Top' }).first()).toBeVisible();
  await expect(resultCards.filter({ hasText: 'Blue Top' })).toHaveCount(1);

  const searchSummary = page.locator('.features_items');
  await expect(searchSummary).toContainText('Blue Top');
});
