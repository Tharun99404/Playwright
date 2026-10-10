const { test, expect } = require('@playwright/test');

test('add a product to the cart', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');

  const productCard = page.locator('.product-image-wrapper').first();

  await productCard.hover();
  await productCard.locator('a.add-to-cart').first().click();

  await expect(page.locator('.modal')).toContainText(/added/i);
  await page.locator('.modal a[href="/view_cart"]').click();

  await page.waitForURL(/\/view_cart/);
  await expect(page.getByText('Blue Top')).toBeVisible();
});
