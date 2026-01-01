import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  //page elements as variables initialized inside constructor all-at-one-go.
  private header_label: Locator;
  private username_textbox: Locator;
  private password_textbox: Locator;
  private login_button: Locator;

  public LoginPage(page: Page) {
    this.page = page;
    this.header_label = this.page.locator(`.login_logo`);
    this.username_textbox = this.page.locator(`#user-name`);
    this.password_textbox = this.page.locator(`#password`);
    this.login_button = this.page.locator(`#login-button`);
  }

  async inputUserName(userName: string) {
    await this.username_textbox.fill(userName);
  }
  async inputPassword(password: string) {
    await this.password_textbox.fill(password);
  }
  async clickLogin() {
    await this.login_button.click();
  }
  async doLogin(userName: string, password: string) {
    //Facaded
    await this.inputUserName(userName);
    await this.inputPassword(password);
    await this.clickLogin();
  }
}
