import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/ui/pages/LoginPage';
import { DashboardPage } from '../../src/ui/pages/DashboardPage';
import { TranslateInboundPage } from '../../src/ui/pages/TranslateInboundPage';
import { TranslateOutboundPage } from '../../src/ui/pages/TranslateOutboundPage';
import { config } from '../../src/config/env';

/**
 * Smoke test for EDI login and the translate inbound/outbound flow.
 *
 * Uses reusable page objects and healing locators to make the test easier
 * to maintain and more resilient to locator changes.
 */
test('EDI login and inbound triggers', async ({ page }) => {
  test.setTimeout(120000);
  page.setDefaultTimeout(60000);

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const translateInboundPage = new TranslateInboundPage(page);
  const translateOutboundPage = new TranslateOutboundPage(page);

  // STEP 1: Navigate to the login page and verify login screen is visible.
  await page.goto(config.baseUrl);
  await expect(loginPage.loginLogo()).toBeVisible();
  await expect(page.locator('div').nth(1)).toBeVisible(); 

  // STEP 2: Log in with credentials stored in the shared env config.
  await loginPage.login(config.username, config.password);

  // STEP 3: Verify the dashboard has loaded successfully.
  await expect(dashboardPage.homeLink()).toBeVisible();
  await expect(dashboardPage.financialsLink()).toBeVisible();
  await expect(dashboardPage.navigationMenuButton()).toBeVisible();

  // STEP 4: Close optional email notification if it appears.
  // This uses a healed locator from the dashboard page object.
  const emailNotificationButton = await dashboardPage.emailNotificationButtonHealed();

  if (await emailNotificationButton.isVisible()) {
    await emailNotificationButton.click();
  }

  await page.waitForLoadState('networkidle');
  await expect(dashboardPage.pageTitle()).toBeVisible({ timeout: 90000 });
  await expect(dashboardPage.toggleNavigationButton()).toBeVisible();
  await dashboardPage.toggleNavigationButton().click();
  await expect(dashboardPage.webButton()).toBeVisible();

  // STEP 5: Select EDI from the dashboard combobox and verify the EDI section.
  await expect(dashboardPage.searchTextbox()).toBeVisible({ timeout: 60000 });
  await dashboardPage.webCombobox().click({ timeout: 60000 });
  await dashboardPage.ediOption().click({ timeout: 60000 });
  await expect(dashboardPage.ediListOption()).toContainText('EDI', { timeout: 60000 });
  await expect(dashboardPage.ediComboboxSpan()).toBeVisible({ timeout: 60000 });
  await expect(dashboardPage.combobox()).toContainText('EDI', { timeout: 60000 });

  // Verify the dashboard tab navigation appears as expected.
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

  // STEP 6: Verify the Translate Inbound page header and sections.
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

  // STEP 9: Open Translate Outbound and verify the outbound page is visible.
  await translateOutboundPage.translateOutboundLink().click({ timeout: 60000 });
  await expect(translateOutboundPage.translateOutboundHeading()).toBeVisible({ timeout: 60000 });
  
  await translateOutboundPage.dataSourceText().click();
  await expect(translateOutboundPage.dataSourceText()).toBeVisible();
  await expect(translateOutboundPage.processTypeText()).toBeVisible();
  await expect(translateOutboundPage.deleteInputDataText()).toBeVisible();
  await expect(translateOutboundPage.treatMissingDataText()).toBeVisible();
  await expect(translateOutboundPage.logLevelText()).toBeVisible();
  await expect(translateOutboundPage.reportDistributionHeading()).toBeVisible();
  await expect(translateOutboundPage.dataSourceCombobox()).toBeVisible();
  await expect(translateOutboundPage.processTypeCombobox()).toBeVisible();
  await expect(translateOutboundPage.logLevelCombobox()).toBeVisible();
  await expect(translateOutboundPage.translateOutboundReportTextbox()).toBeVisible();
  await expect(translateOutboundPage.reportExportTypeCombobox()).toBeVisible();
  
  await translateOutboundPage.selectLogLevel('ALL');
  await expect(translateOutboundPage.allSpan()).toBeVisible();
  await translateOutboundPage.submitButton().click();
});