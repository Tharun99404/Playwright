const { test, expect } = require('@playwright/test');

test('update product quantity in cart', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/products');

  const productCard = page.locator('.product-image-wrapper').filter({ hasText: 'Blue Top' }).first();
  await productCard.hover();
  await productCard.locator('a.add-to-cart').first().click();

  await page.locator('.modal a[href="/view_cart"]').click();
  await page.waitForURL(/\/view_cart/);

  const cartRow = page.locator('#cart_info_table tbody tr').filter({ hasText: 'Blue Top' }).first();
  await expect(cartRow).toContainText('1');

  await page.goto('https://www.automationexercise.com/products');
  const secondAdd = page.locator('.product-image-wrapper').filter({ hasText: 'Blue Top' }).first();
  await secondAdd.hover();
  await secondAdd.locator('a.add-to-cart').first().click();

  await page.locator('.modal a[href="/view_cart"]').click();
  await page.waitForURL(/\/view_cart/);

  const updatedCartRow = page.locator('#cart_info_table tbody tr').filter({ hasText: 'Blue Top' }).first();
  await expect(updatedCartRow).toContainText('2');
  await expect(updatedCartRow).toContainText('Rs. 1000');
});
