import { Page, FrameLocator } from '@playwright/test';

export class TranslateOutboundPage {
  private frame: FrameLocator;

  constructor(private page: Page) {
    this.frame = page.locator('iframe[name="fsm_35_1eb46ae5-43be-49f0-b4bd-6c66f9cd9e5d"]').contentFrame();
  }

  translateOutboundLink = () => this.frame.locator('a').filter({ hasText: 'Translate Outbound Data' });
  translateOutboundHeading = () => this.frame.getByRole('heading', { name: 'Translate Outbound' });
  translateOutboundLabel = () => this.frame.getByLabel('Translate Outbound', { exact: true });
  
  dataSourceText = () => this.translateOutboundLabel().getByText('Data Source');
  processTypeText = () => this.frame.getByText('Process Type');
  deleteInputDataText = () => this.frame.getByText('Delete Input Data');
  treatMissingDataText = () => this.frame.getByText('Treat Missing Data');
  logLevelText = () => this.frame.getByText('Log Level');
  reportDistributionHeading = () => this.frame.getByRole('heading', { name: 'Report Distribution' });
  
  dataSourceCombobox = () => this.frame.getByRole('combobox', { name: 'Data Source' });
  processTypeCombobox = () => this.frame.getByRole('combobox', { name: 'Process Type' });
  logLevelCombobox = () => this.frame.getByRole('combobox', { name: 'Log Level' });
  translateOutboundReportTextbox = () => this.frame.getByRole('textbox', { name: 'Translate Outbound Report' });
  reportExportTypeCombobox = () => this.frame.getByRole('combobox', { name: 'Report Export Type' });
  
  infoSpan = () => this.frame.locator('span').filter({ hasText: 'INFO' });
  allOption = () => this.frame.getByRole('option', { name: 'ALL' });
  allSpan = () => this.frame.locator('span').filter({ hasText: 'ALL' });
  
  submitButton = () => this.frame.getByRole('button', { name: 'Submit' });

  async selectLogLevel(level: string) {
    await this.infoSpan().click();
    await this.allOption().click();
  }
}
