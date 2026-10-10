const { test, expect } = require('@playwright/test');

test('remove a product from the cart', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');

  const productCard = page.locator('.product-image-wrapper').filter({ hasText: 'Blue Top' }).first();
  await productCard.locator('a.add-to-cart').first().click();
  await page.locator('.modal a[href="/view_cart"]').click();

  await page.waitForURL(/\/view_cart/);
  await page.locator('.cart_quantity_delete').click();

  await expect(page.locator('td.cart_description h4 a').filter({ hasText: 'Blue Top' })).toHaveCount(0);
  await expect(page.locator('body')).toContainText(/cart is empty/i);
});
