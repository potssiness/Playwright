import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(120000);
  page.setDefaultTimeout(60000);

  await page.goto('https://mingle-cqa-portal.cqa.inforcloudsuite.com/v2/D830RC3_AX1');
  await expect(page.getByRole('img', { name: 'Infor logo' })).toBeVisible();
  await expect(page.locator('div').nth(1)).toBeVisible(); 
  await page.locator('[data-test-id="login-username"]').click();
  await page.locator('[data-test-id="login-username"]').press('ControlOrMeta+V');
  await page.locator('[data-test-id="login-username"]').fill('500094');
  await page.locator('[data-test-id="login-password"]').click();
  await page.locator('[data-test-id="login-password"]').press('ControlOrMeta+V');
  await page.locator('[data-test-id="login-password"]').fill('Qu@l!ty1$ah48!t_MT');
  await page.locator('[data-test-id="login-signin-button"]').click();

  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Financials & Supply Management' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeVisible();

  const emailButton = page.getByRole('button', { name: 'Your email has not been' });
  if (await emailButton.isVisible()) {
    await emailButton.click();
  }

  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().locator('#page-title')).toBeVisible({ timeout: 90000 });
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('button', { name: 'Toggle Navigation' })).toBeVisible();
  await page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('button', { name: 'Toggle Navigation' }).click();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('button', { name: 'Web' })).toBeVisible();

  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('textbox', { name: 'Search' })).toBeVisible();
  await page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('combobox', { name: 'Web' }).click();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('option', { name: 'EDI' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().locator('#list-option-10')).toContainText('EDI');
  await page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('option', { name: 'EDI' }).click();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('combobox', { name: 'EDI' }).locator('span')).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('combobox')).toContainText('EDI');

  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('tab', { name: 'Dashboard' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('tab', { name: 'Data Exchange' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('tab', { name: 'EDI Work' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('tab', { name: 'Data Substitutions' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('tab', { name: 'Trading Partners' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('tab', { name: 'History' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByText('Key Processes')).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByText('Quick Links')).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().locator('#EDIAdministratorPageV3_Dashboard_2_Processing_widget_title').getByText('Processing')).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('link', { name: 'Supply Chain Interfaces' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('link', { name: 'Financial Interfaces' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('link', { name: 'Fact Sheets' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().locator('a').filter({ hasText: 'Translate Outbound Data' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().locator('a').filter({ hasText: 'Translate Inbound Data' })).toBeVisible();
  await page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().locator('a').filter({ hasText: 'Translate Inbound Data' }).click();

  // Trnslate Inbound Data page assertions
  await page.waitForTimeout(5000);
  
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByLabel('Translate Inbound', { exact: true }).locator('div').filter({ hasText: /^Translate Inbound$/ })).toBeVisible({ timeout: 90000 });
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByLabel('Translate Inbound', { exact: true }).locator('h1')).toContainText('Translate Inbound');


  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('heading', { name: 'Translate Inbound' })).toBeVisible({ timeout: 90000 });
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByText('CarrierPress down arrow to')).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByText('Process Type')).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByText('Log Level')).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().locator('span').filter({ hasText: 'INFO' })).toBeVisible();
  await page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('combobox', { name: 'Log Level' }).click({ timeout: 90000 });
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().locator('#list-option-4')).toContainText('ALL');
  await page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('option', { name: 'ALL' }).click();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByLabel('Translate Inbound', { exact: true }).locator('lm-columns-undistributed')).toContainText('ALL');
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('button', { name: 'Cancel' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('button', { name: 'Schedule' })).toBeVisible();
  await expect(page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('button', { name: 'Submit' })).toBeVisible();
  await page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
  

});