import { test, expect } from '@playwright/test';

test.describe('Nestiq Consumer Flow', () => {
  test('should allow a user to search and view a property', async ({ page }) => {
    await page.goto('/');
    
    // Search for Leeds
    const searchInput = page.locator('input[placeholder="Search by location..."]');
    await searchInput.fill('Leeds');
    await page.click('button:has-text("Search")');
    
    // Expect to be on search page
    await expect(page).toHaveURL(/.*search/);
    await expect(page.locator('h1')).toContainText('Properties for Sale');
    
    // Click a property card
    await page.click('h3:has-text("The Ash Manor")');
    
    // Expect to be on property detail page
    await expect(page).toHaveURL(/.*property\/ash-manor/);
    await expect(page.locator('h1')).toContainText('The Ash Manor');
  });

  test('should allow a user to submit an enquiry', async ({ page }) => {
    await page.goto('/property/ash-manor');
    
    // Fill enquiry form
    await page.fill('input[placeholder="Full Name"]', 'Test User');
    await page.fill('input[placeholder="Email Address"]', 'test@example.com');
    await page.fill('textarea', 'I am interested in viewing this property.');
    
    await page.click('button:has-text("Send Enquiry")');
    
    // Expect success message
    await expect(page.locator('h3')).toContainText('Enquiry Sent!');
  });
});

test.describe('Nestiq Agent Flow', () => {
  test('should allow an agent to view the dashboard', async ({ page }) => {
    // Mock login or use session
    await page.goto('/agent');
    
    await expect(page.locator('h1')).toContainText('Agency Overview');
    await expect(page.locator('nav')).toContainText('My Listings');
  });
});
