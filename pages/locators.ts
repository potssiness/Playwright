import { Page, FrameLocator } from '@playwright/test';

export class Locators {
  constructor(private page: Page, private frame: FrameLocator) {}

  // Login Page
  loginLogo = () => this.page.getByRole('img', { name: 'Infor logo' });
  loginUsername = () => this.page.locator('[data-test-id="login-username"]');
  loginPassword = () => this.page.locator('[data-test-id="login-password"]');
  loginSignInButton = () => this.page.locator('[data-test-id="login-signin-button"]');

  // Home Page
  homeLink = () => this.page.getByRole('link', { name: 'Home' });
  financialsLink = () => this.page.getByRole('link', { name: 'Financials & Supply Management' });
  navigationMenuButton = () => this.page.getByRole('button', { name: 'Open navigation menu' });
  emailNotificationButton = () => this.page.getByRole('button', { name: 'Your email has not been' });

  // Frame Elements
  pageTitle = () => this.frame.locator('#page-title');
  toggleNavigationButton = () => this.frame.getByRole('button', { name: 'Toggle Navigation' });
  webButton = () => this.frame.getByRole('button', { name: 'Web' });
  searchTextbox = () => this.frame.getByRole('textbox', { name: 'Search' });
  webCombobox = () => this.frame.getByRole('combobox', { name: 'Web' });
  ediOption = () => this.frame.getByRole('option', { name: 'EDI' });
  ediListOption = () => this.frame.locator('#list-option-10');
  ediCombobox = () => this.frame.getByRole('combobox', { name: 'EDI' });
  ediComboboxSpan = () => this.frame.getByRole('combobox', { name: 'EDI' }).locator('span');
  combobox = () => this.frame.getByRole('combobox');

  // Dashboard Tabs
  dashboardTab = () => this.frame.getByRole('tab', { name: 'Dashboard' });
  dataExchangeTab = () => this.frame.getByRole('tab', { name: 'Data Exchange' });
  ediWorkTab = () => this.frame.getByRole('tab', { name: 'EDI Work' });
  dataSubstitutionsTab = () => this.frame.getByRole('tab', { name: 'Data Substitutions' });
  tradingPartnersTab = () => this.frame.getByRole('tab', { name: 'Trading Partners' });
  historyTab = () => this.frame.getByRole('tab', { name: 'History' });

  // Dashboard Content
  keyProcessesText = () => this.frame.getByText('Key Processes');
  quickLinksText = () => this.frame.getByText('Quick Links');
  processingText = () => this.frame.locator('#EDIAdministratorPageV3_Dashboard_2_Processing_widget_title').getByText('Processing');
  supplyChainLink = () => this.frame.getByRole('link', { name: 'Supply Chain Interfaces' });
  financialInterfacesLink = () => this.frame.getByRole('link', { name: 'Financial Interfaces' });
  factSheetsLink = () => this.frame.getByRole('link', { name: 'Fact Sheets' });
  translateOutboundLink = () => this.frame.locator('a').filter({ hasText: 'Translate Outbound Data' });
  translateInboundLink = () => this.frame.locator('a').filter({ hasText: 'Translate Inbound Data' });

  // Translate Inbound Page
  translateInboundDiv = () => this.frame.getByLabel('Translate Inbound', { exact: true }).locator('div').filter({ hasText: /^Translate Inbound$/ });
  translateInboundHeading = () => this.frame.getByLabel('Translate Inbound', { exact: true }).locator('h1');
  translateInboundH1 = () => this.frame.getByRole('heading', { name: 'Translate Inbound' });
  carrierText = () => this.frame.getByText('CarrierPress down arrow to');
  processTypeText = () => this.frame.getByText('Process Type');
  logLevelText = () => this.frame.getByText('Log Level');
  infoSpan = () => this.frame.locator('span').filter({ hasText: 'INFO' });
  logLevelCombobox = () => this.frame.getByRole('combobox', { name: 'Log Level' });
  allListOption = () => this.frame.locator('#list-option-4');
  allOption = () => this.frame.getByRole('option', { name: 'ALL' });
  columnsUndistributed = () => this.frame.getByLabel('Translate Inbound', { exact: true }).locator('lm-columns-undistributed');
  cancelButton = () => this.frame.getByRole('button', { name: 'Cancel' });
  scheduleButton = () => this.frame.getByRole('button', { name: 'Schedule' });
  submitButton = () => this.frame.getByRole('button', { name: 'Submit' });
}
