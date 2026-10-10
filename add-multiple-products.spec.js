const { test, expect } = require('@playwright/test');

test('add multiple products to the cart', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');

  const productNames = ['Blue Top', 'Men Tshirt'];

  for (const productName of productNames) {
    const card = page.locator('.product-image-wrapper').filter({ hasText: productName }).first();
    await card.locator('a.add-to-cart').first().click();
    await page.locator('.modal a[href="/view_cart"]').click();
    await page.waitForURL(/\/view_cart/);
    await page.goto('https://www.automationexercise.com/products');
  }

  await page.goto('https://www.automationexercise.com/view_cart');

  for (const productName of productNames) {
    await expect(page.locator('td.cart_description h4 a').filter({ hasText: productName })).toBeVisible();
  }

  const itemTotals = await page.locator('table tbody tr td:nth-child(5) p').allTextContents();
  const totalFromRows = itemTotals.reduce((sum, value) => {
    const numericValue = Number.parseFloat(value.replace(/[^\d.]/g, '')) || 0;
    return sum + numericValue;
  }, 0);

  expect(totalFromRows).toBeGreaterThan(0);
  expect(itemTotals.length).toBeGreaterThanOrEqual(2);
});
