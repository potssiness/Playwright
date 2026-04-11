import { Page, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for the Translate Inbound screen.
 */
export class TranslateInboundPage extends BasePage {
  private frame: FrameLocator;

  constructor(page: Page) {
    super(page);
    this.frame = page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame();
  }

  // Page headings and labels
  translateInboundDiv = () => this.frame.getByLabel('Translate Inbound', { exact: true }).locator('div').filter({ hasText: /^Translate Inbound$/ });
  translateInboundHeading = () => this.frame.getByLabel('Translate Inbound', { exact: true }).locator('h1');
  translateInboundH1 = () => this.frame.getByRole('heading', { name: 'Translate Inbound' });

  // Form labels and fields
  carrierText = () => this.frame.getByText('CarrierPress down arrow to');
  processTypeText = () => this.frame.getByText('Process Type');
  logLevelText = () => this.frame.getByText('Log Level');
  infoSpan = () => this.frame.locator('span').filter({ hasText: 'INFO' });
  logLevelCombobox = () => this.frame.getByRole('combobox', { name: 'Log Level' });
  allListOption = () => this.frame.locator('#list-option-4');
  allOption = () => this.frame.getByRole('option', { name: 'ALL' });
  columnsUndistributed = () => this.frame.getByLabel('Translate Inbound', { exact: true }).locator('lm-columns-undistributed');

  // Primary action buttons
  cancelButton = () => this.frame.getByRole('button', { name: 'Cancel' });
  scheduleButton = () => this.frame.getByRole('button', { name: 'Schedule' });
  submitButton = () => this.frame.getByRole('button', { name: 'Submit' });
}
