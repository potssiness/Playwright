import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class LoginFlow {
  private loginPage: LoginPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async performLogin(username: string, password: string) {
    await this.loginPage.login(username, password);
  }
}
