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

  await expect(dashboardPage.searchTextbox()).toBeVisible();
  await dashboardPage.webCombobox().click();
  await expect(dashboardPage.ediOption()).toBeVisible();
  await expect(dashboardPage.ediListOption()).toContainText('EDI');

  await dashboardPage.ediOption().click();
  await expect(dashboardPage.ediComboboxSpan()).toBeVisible();
  await expect(dashboardPage.combobox()).toContainText('EDI');

  await expect(dashboardPage.dashboardTab()).toBeVisible({ timeout: 30000 });
  await expect(dashboardPage.dataExchangeTab()).toBeVisible();
  await expect(dashboardPage.ediWorkTab()).toBeVisible();
  await expect(dashboardPage.dataSubstitutionsTab()).toBeVisible();
  await expect(dashboardPage.tradingPartnersTab()).toBeVisible();
  await expect(dashboardPage.historyTab()).toBeVisible();
  await expect(dashboardPage.keyProcessesText()).toBeVisible();
  await expect(dashboardPage.quickLinksText()).toBeVisible();
  await expect(dashboardPage.processingText()).toBeVisible();
  await expect(dashboardPage.supplyChainLink()).toBeVisible();
  await expect(dashboardPage.financialInterfacesLink()).toBeVisible();
  await expect(dashboardPage.factSheetsLink()).toBeVisible();
  await expect(dashboardPage.translateOutboundLink()).toBeVisible();
  await expect(dashboardPage.translateInboundLink()).toBeVisible();
  await dashboardPage.translateInboundLink().click();

  await page.waitForLoadState('networkidle');
  await translateInboundPage.translateInboundDiv().waitFor({ state: 'visible', timeout: 120000 });
  await expect(translateInboundPage.translateInboundDiv()).toBeVisible();
  await expect(translateInboundPage.translateInboundHeading()).toContainText('Translate Inbound');

  await expect(translateInboundPage.translateInboundH1()).toBeVisible();
  await expect(translateInboundPage.carrierText()).toBeVisible();
  await expect(translateInboundPage.processTypeText()).toBeVisible();
  await expect(translateInboundPage.logLevelText()).toBeVisible();
  await expect(translateInboundPage.infoSpan()).toBeVisible();
  await translateInboundPage.logLevelCombobox().click();
  await expect(translateInboundPage.allListOption()).toContainText('ALL');
  await translateInboundPage.allOption().click({ timeout: 30000 });
  await expect(translateInboundPage.columnsUndistributed()).toContainText('ALL');
  await expect(translateInboundPage.cancelButton()).toBeVisible();
  await expect(translateInboundPage.scheduleButton()).toBeVisible();
  await expect(translateInboundPage.submitButton()).toBeVisible();
  await translateInboundPage.submitButton().click();
});