import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginLogo = () => this.page.getByRole('img', { name: 'Infor logo' });
  loginUsername = () => this.page.locator('[data-test-id="login-username"]');
  loginPassword = () => this.page.locator('[data-test-id="login-password"]');
  loginSignInButton = () => this.page.locator('[data-test-id="login-signin-button"]');

  async login(username: string, password: string) {
    await this.loginUsername().fill(username);
    await this.loginPassword().fill(password);
    await this.loginSignInButton().click();
    await this.page.waitForLoadState('networkidle');
  }
}
