const { test, expect } = require('@playwright/test');

test('user registration with valid details', async ({ page }) => {
  const email = `user${Date.now()}@example.com`;

  await page.goto('https://www.automationexercise.com/');
  await page.getByRole('link', { name: /signup \/ login/i }).click();

  await page.locator('input[data-qa="signup-name"]').fill('Tharun');
  await page.locator('input[data-qa="signup-email"]').fill(email);
  await page.locator('button[data-qa="signup-button"]').click();

  await expect(page.getByText('Enter Account Information')).toBeVisible();

  await page.locator('input[data-qa="password"]').fill('Test@234');
  await page.locator('#id_gender1').check();
  await page.locator('select[data-qa="days"]').selectOption('20');
  await page.locator('select[data-qa="months"]').selectOption('May');
  await page.locator('select[data-qa="years"]').selectOption('1995');
  await page.locator('input[data-qa="first_name"]').fill('Tharun');
  await page.locator('input[data-qa="last_name"]').fill('Kumar');
  await page.locator('input[data-qa="company"]').fill('QA Team');
  await page.locator('input[data-qa="address"]').fill('123 Main Street');
  await page.locator('input[data-qa="state"]').fill('Tamil Nadu');
  await page.locator('input[data-qa="city"]').fill('Chennai');
  await page.locator('input[data-qa="zipcode"]').fill('600001');
  await page.locator('input[data-qa="mobile_number"]').fill('9876543210');

  await page.locator('button[data-qa="create-account"]').click();

  await expect(page.getByText('Account Created!')).toBeVisible();
});
