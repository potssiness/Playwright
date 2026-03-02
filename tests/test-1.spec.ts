import { test, expect } from '@playwright/test';
import { Locators } from '../pages/locators';

test('test', async ({ page }) => {
  test.setTimeout(120000);
  page.setDefaultTimeout(60000);

  await page.goto('https://mingle-cqa-portal.cqa.inforcloudsuite.com/v2/D830RC3_AX1');
  
  const frame = page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame();
  const loc = new Locators(page, frame);

  await expect(loc.loginLogo()).toBeVisible();
  await expect(page.locator('div').nth(1)).toBeVisible(); 
  await loc.loginUsername().click();
  await loc.loginUsername().press('ControlOrMeta+V');
  await loc.loginUsername().fill('500094');
  await loc.loginPassword().click();
  await loc.loginPassword().press('ControlOrMeta+V');
  await loc.loginPassword().fill('Qu@l!ty1$ah48!t_MT');
  await loc.loginSignInButton().click();

  await page.waitForLoadState('networkidle');
  await expect(loc.homeLink()).toBeVisible();
  await expect(loc.financialsLink()).toBeVisible();
  await expect(loc.navigationMenuButton()).toBeVisible();

  if (await loc.emailNotificationButton().isVisible()) {
    await loc.emailNotificationButton().click();
  }

  await page.waitForLoadState('networkidle');
  await expect(loc.pageTitle()).toBeVisible({ timeout: 90000 });
  await expect(loc.toggleNavigationButton()).toBeVisible();
  await loc.toggleNavigationButton().click();
  await expect(loc.webButton()).toBeVisible();

  await expect(loc.searchTextbox()).toBeVisible();
  await loc.webCombobox().click();
  await expect(loc.ediOption()).toBeVisible();
  await expect(loc.ediListOption()).toContainText('EDI');
  await loc.ediOption().click();
  await expect(loc.ediComboboxSpan()).toBeVisible();
  await expect(loc.combobox()).toContainText('EDI');

  await expect(loc.dashboardTab()).toBeVisible({ timeout: 30000 });
  await expect(loc.dataExchangeTab()).toBeVisible();
  await expect(loc.ediWorkTab()).toBeVisible();
  await expect(loc.dataSubstitutionsTab()).toBeVisible();
  await expect(loc.tradingPartnersTab()).toBeVisible();
  await expect(loc.historyTab()).toBeVisible();
  await expect(loc.keyProcessesText()).toBeVisible();
  await expect(loc.quickLinksText()).toBeVisible();
  await expect(loc.processingText()).toBeVisible();
  await expect(loc.supplyChainLink()).toBeVisible();
  await expect(loc.financialInterfacesLink()).toBeVisible();
  await expect(loc.factSheetsLink()).toBeVisible();
  await expect(loc.translateOutboundLink()).toBeVisible();
  await expect(loc.translateInboundLink()).toBeVisible();
  await loc.translateInboundLink().click();

  await page.waitForLoadState('networkidle');
  await loc.translateInboundDiv().waitFor({ state: 'visible', timeout: 120000 });
  await expect(loc.translateInboundDiv()).toBeVisible();
  await expect(loc.translateInboundHeading()).toContainText('Translate Inbound');

  await expect(loc.translateInboundH1()).toBeVisible();
  await expect(loc.carrierText()).toBeVisible();
  await expect(loc.processTypeText()).toBeVisible();
  await expect(loc.logLevelText()).toBeVisible();
  await expect(loc.infoSpan()).toBeVisible();
  await loc.logLevelCombobox().click();
  await expect(loc.allListOption()).toContainText('ALL');
  await loc.allOption().click();
  await expect(loc.columnsUndistributed()).toContainText('ALL');
  await expect(loc.cancelButton()).toBeVisible();
  await expect(loc.scheduleButton()).toBeVisible();
  await expect(loc.submitButton()).toBeVisible();
  await loc.submitButton().click();
});