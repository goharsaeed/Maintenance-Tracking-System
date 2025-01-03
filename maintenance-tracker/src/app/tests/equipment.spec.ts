import { test, expect } from '@playwright/test';

test('should create new equipment with valid data', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('input[name="name"]', 'Machine A');
  await page.fill('input[name="location"]', 'Building 1');
  // Fill other fields
  await page.click('button[type="submit"]');
  expect(await page.textContent('table')).toContain('Machine A');
});
