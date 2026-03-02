import { Page } from '@playwright/test';
import { Locators } from './locators';

export class LoginActions {
  constructor(private page: Page, private loc: Locators) {}

  async login(username: string, password: string) {
    await this.loc.loginUsername().fill(username);
    await this.loc.loginPassword().fill(password);
    await this.loc.loginSignInButton().click();
    await this.page.waitForLoadState('networkidle');
  }
}
