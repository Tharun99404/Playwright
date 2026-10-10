const { test, expect } = require('@playwright/test');

test('place an order successfully after login', async ({ page }) => {
  const email = `orderuser${Date.now()}@example.com`;
  const password = 'Test@234';
  const firstName = 'Order';
  const lastName = 'User';

  await page.goto('https://www.automationexercise.com/');
  await page.getByRole('link', { name: /signup \/ login/i }).click();

  await page.locator('input[data-qa="signup-name"]').fill(`${firstName} ${lastName}`);
  await page.locator('input[data-qa="signup-email"]').fill(email);
  await page.locator('button[data-qa="signup-button"]').click();

  await expect(page.getByText('Enter Account Information')).toBeVisible();

  await page.locator('input[data-qa="password"]').fill(password);
  await page.locator('#id_gender1').check();
  await page.locator('select[data-qa="days"]').selectOption('20');
  await page.locator('select[data-qa="months"]').selectOption('May');
  await page.locator('select[data-qa="years"]').selectOption('1995');
  await page.locator('input[data-qa="first_name"]').fill(firstName);
  await page.locator('input[data-qa="last_name"]').fill(lastName);
  await page.locator('input[data-qa="address"]').fill('123 Main Street');
  await page.locator('input[data-qa="state"]').fill('Tamil Nadu');
  await page.locator('input[data-qa="city"]').fill('Chennai');
  await page.locator('input[data-qa="zipcode"]').fill('600001');
  await page.locator('input[data-qa="mobile_number"]').fill('9876543210');
  await page.locator('button[data-qa="create-account"]').click();

  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: /continue/i }).click();

  await page.goto('https://www.automationexercise.com/products');
  const productCard = page.locator('.product-image-wrapper').filter({ hasText: 'Blue Top' }).first();
  await productCard.hover();
  await productCard.locator('a.add-to-cart').first().click();

  await page.locator('.modal a[href="/view_cart"]').click();
  await page.waitForURL(/\/view_cart/);
  await page.locator('a.check_out').click();
  await expect(page.getByRole('heading', { name: /address details/i })).toBeVisible();

  await page.getByRole('link', { name: /place order/i }).click();
  await expect(page.locator('input[name="name_on_card"]')).toBeVisible();

  await page.locator('input[name="name_on_card"]').fill(`${firstName} ${lastName}`);
  await page.locator('input[name="card_number"]').fill('4111111111111111');
  await page.locator('input[name="cvc"]').fill('123');
  await page.locator('input[name="expiry_month"]').fill('12');
  await page.locator('input[name="expiry_year"]').fill('2030');
  await page.locator('button[data-qa="pay-button"]').click();

  await expect(page.getByRole('heading', { name: /order placed!/i })).toBeVisible();
  await expect(page.getByText(/congratulations! your order has been confirmed!/i)).toBeVisible();
});
