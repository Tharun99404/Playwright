const { test, expect } = require('@playwright/test');

test('user cannot login with invalid credentials', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');

  await page.locator('input[data-qa="login-email"]').fill('wrong@example.com');
  await page.locator('input[data-qa="login-password"]').fill('wrongpassword');
  await page.locator('button[data-qa="login-button"]').click();

  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});
