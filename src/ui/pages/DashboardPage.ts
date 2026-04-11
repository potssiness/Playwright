import { Page, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for the dashboard screen and frame contents.
 */
export class DashboardPage extends BasePage {
  private frame: FrameLocator;

  constructor(page: Page) {
    super(page);
    this.frame = page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame();
  }

  // Top-bar links and buttons outside the embedded dashboard frame
  homeLink = () => this.page.getByRole('link', { name: 'Home' });
  financialsLink = () => this.page.getByRole('link', { name: 'Financials & Supply Management' });
  navigationMenuButton = () => this.page.getByRole('button', { name: 'Open navigation menu' });
  emailNotificationButton = () => this.page.getByRole('button', { name: 'Your email has not been' });

  /**
   * Returns a healed locator for the email notification button.
   *
   * This gives the test a fallback path when the exact label or attributes change.
   */
  async emailNotificationButtonHealed() {
    return this.healingLocator([
      'button[aria-label="Your email has not been"]',
      'button:has-text("Your email")',
      'button[title*="email"]',
      'button:has-text("Notification")',
    ]);
  }

  // Frame content locators
  pageTitle = () => this.frame.locator('#page-title');
  toggleNavigationButton = () => this.frame.getByRole('button', { name: 'Toggle Navigation' });
  webButton = () => this.frame.getByRole('button', { name: 'Web' });
  searchTextbox = () => this.frame.getByRole('textbox', { name: 'Search' });
  webCombobox = () => this.frame.getByRole('combobox', { name: 'Web' });
  ediOption = () => this.frame.getByRole('option', { name: 'EDI', exact: true });
  ediListOption = () => this.frame.getByRole('option', { name: 'EDI', exact: true });
  ediCombobox = () => this.frame.getByRole('combobox', { name: 'EDI' });
  ediComboboxSpan = () => this.frame.getByRole('combobox', { name: 'EDI' }).locator('span');
  combobox = () => this.frame.getByRole('combobox');

  dashboardTab = () => this.frame.getByRole('tab', { name: 'Dashboard' });
  dataExchangeTab = () => this.frame.getByRole('tab', { name: 'Data Exchange' });
  ediWorkTab = () => this.frame.getByRole('tab', { name: 'EDI Work' });
  dataSubstitutionsTab = () => this.frame.getByRole('tab', { name: 'Data Substitutions' });
  tradingPartnersTab = () => this.frame.getByRole('tab', { name: 'Trading Partners' });
  historyTab = () => this.frame.getByRole('tab', { name: 'History' });

  keyProcessesText = () => this.frame.getByText('Key Processes');
  quickLinksText = () => this.frame.getByText('Quick Links');
  processingText = () => this.frame.locator('#EDIAdministratorPageV3_Dashboard_2_Processing_widget_title').getByText('Processing');
  supplyChainLink = () => this.frame.getByRole('link', { name: 'Supply Chain Interfaces' });
  financialInterfacesLink = () => this.frame.getByRole('link', { name: 'Financial Interfaces' });
  factSheetsLink = () => this.frame.getByRole('link', { name: 'Fact Sheets' });
  translateOutboundLink = () => this.frame.locator('a').filter({ hasText: 'Translate Outbound Data' });
  translateInboundLink = () => this.frame.locator('a').filter({ hasText: 'Translate Inbound Data' });
  
}
