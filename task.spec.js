import { test, expect } from '@playwright/test';

test('add a few todo items in TodoMVC', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const todoInput = page.getByPlaceholder('What needs to be done?');
  const items = ['Buy milk', 'Write tests', 'Deploy app'];

  for (const item of items) {
    await todoInput.fill(item);
    await todoInput.press('Enter');
  }

  await expect(page.locator('.todo-list li')).toHaveCount(items.length);
  for (const item of items) {
    await expect(page.getByText(item, { exact: true })).toBeVisible();
  }
});