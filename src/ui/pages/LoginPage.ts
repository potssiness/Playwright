import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for the login screen.
 *
 * Encapsulates all login page locators and login actions.
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Page elements for the login screen
  loginLogo = () => this.page.getByRole('img', { name: 'Infor logo' });
  loginUsername = () => this.page.locator('[data-test-id="login-username"]');
  loginPassword = () => this.page.locator('[data-test-id="login-password"]');
  loginSignInButton = () => this.page.locator('[data-test-id="login-signin-button"]');

  /**
   * Performs the login flow using the provided credentials.
   */
  async login(username: string, password: string) {
    await this.loginUsername().fill(username);
    await this.loginPassword().fill(password);
    await this.loginSignInButton().click();
    await this.page.waitForLoadState('networkidle');
  }
}
