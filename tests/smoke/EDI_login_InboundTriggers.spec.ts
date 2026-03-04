import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/ui/pages/LoginPage';
import { DashboardPage } from '../../src/ui/pages/DashboardPage';
import { TranslateInboundPage } from '../../src/ui/pages/TranslateInboundPage';
import { config } from '../../src/config/env';

test('EDI login and inbound triggers', async ({ page }) => {
  test.setTimeout(120000);
  page.setDefaultTimeout(60000);

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const translateInboundPage = new TranslateInboundPage(page);

  await page.goto(config.baseUrl);
  
  await expect(loginPage.loginLogo()).toBeVisible();
  await expect(page.locator('div').nth(1)).toBeVisible(); 
  await loginPage.login(config.username, config.password);

  await expect(dashboardPage.homeLink()).toBeVisible();
  await expect(dashboardPage.financialsLink()).toBeVisible();
  await expect(dashboardPage.navigationMenuButton()).toBeVisible();

  if (await dashboardPage.emailNotificationButton().isVisible()) {
    await dashboardPage.emailNotificationButton().click();
  }

  await page.waitForLoadState('networkidle');
  await expect(dashboardPage.pageTitle()).toBeVisible({ timeout: 90000 });
  await expect(dashboardPage.toggleNavigationButton()).toBeVisible();
  await dashboardPage.toggleNavigationButton().click();
  await expect(dashboardPage.webButton()).toBeVisible();

  await expect(dashboardPage.searchTextbox()).toBeVisible({ timeout: 60000 });
  await dashboardPage.webCombobox().click({ timeout: 60000 });
  await expect(dashboardPage.ediOption()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.ediListOption()).toContainText('EDI', { timeout: 60000 });

  await dashboardPage.ediOption().click({ timeout: 60000 });
  await expect(dashboardPage.ediComboboxSpan()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.combobox()).toContainText('EDI', { timeout: 60000 });

  await expect(dashboardPage.dashboardTab()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.dataExchangeTab()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.ediWorkTab()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.dataSubstitutionsTab()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.tradingPartnersTab()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.historyTab()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.keyProcessesText()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.quickLinksText()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.processingText()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.supplyChainLink()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.financialInterfacesLink()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.factSheetsLink()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.translateOutboundLink()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.translateInboundLink()).toBeVisible({ timeout: 60000 });
  await dashboardPage.translateInboundLink().click({ timeout: 60000 });

  await page.waitForLoadState('networkidle');
  await translateInboundPage.translateInboundDiv().waitFor({ state: 'visible', timeout: 120000 });
  await expect(translateInboundPage.translateInboundDiv()).toBeVisible({ timeout: 60000 });
  await expect(translateInboundPage.translateInboundHeading()).toContainText('Translate Inbound', { timeout: 60000 });

  await expect(translateInboundPage.translateInboundH1()).toBeVisible({ timeout: 60000 });
  await expect(translateInboundPage.carrierText()).toBeVisible({ timeout: 60000 });
  await expect(translateInboundPage.processTypeText()).toBeVisible({ timeout: 60000 });
  await expect(translateInboundPage.logLevelText()).toBeVisible({ timeout: 60000 });
  await expect(translateInboundPage.infoSpan()).toBeVisible({ timeout: 60000 });
  await translateInboundPage.logLevelCombobox().click({ timeout: 60000 });
  await expect(translateInboundPage.allListOption()).toContainText('ALL', { timeout: 60000 });
  await translateInboundPage.allOption().click({ timeout: 60000 });
  await expect(translateInboundPage.columnsUndistributed()).toContainText('ALL', { timeout: 60000 });
  await expect(translateInboundPage.cancelButton()).toBeVisible({ timeout: 60000 });
  await expect(translateInboundPage.scheduleButton()).toBeVisible({ timeout: 60000 });
  await expect(translateInboundPage.submitButton()).toBeVisible({ timeout: 60000 });
  await translateInboundPage.submitButton().click({ timeout: 60000 });


  const frame = page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame();
  
  await frame.locator('a').filter({ hasText: 'Translate Outbound Data' }).click({ timeout: 60000 });
  await expect(frame.getByRole('heading', { name: 'Translate Outbound' })).toBeVisible({ timeout: 60000 });
  
  const translateOutboundLabel = frame.getByLabel('Translate Outbound', { exact: true });
  await translateOutboundLabel.getByText('Data Source').click();
  await expect(translateOutboundLabel.getByText('Data Source')).toBeVisible();
  await expect(frame.getByText('Process Type')).toBeVisible();
  await expect(frame.getByText('Delete Input Data')).toBeVisible();
  await expect(frame.getByText('Treat Missing Data')).toBeVisible();
  await expect(frame.getByText('Log Level')).toBeVisible();
  await expect(frame.getByRole('heading', { name: 'Report Distribution' })).toBeVisible();
  await expect(frame.getByRole('combobox', { name: 'Data Source' })).toBeVisible();
  await expect(frame.getByRole('combobox', { name: 'Process Type' })).toBeVisible();
  await expect(frame.getByRole('combobox', { name: 'Log Level' })).toBeVisible();
  await expect(frame.getByRole('textbox', { name: 'Translate Outbound Report' })).toBeVisible();
  await expect(frame.getByRole('combobox', { name: 'Report Export Type' })).toBeVisible();
  
  await frame.locator('span').filter({ hasText: 'INFO' }).click();
  await frame.getByRole('option', { name: 'ALL' }).click();
  await expect(frame.locator('span').filter({ hasText: 'ALL' })).toBeVisible();
  await frame.getByRole('button', { name: 'Submit' }).click();


});