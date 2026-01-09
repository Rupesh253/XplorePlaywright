import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  //page elements as properties and are initialized upon call.
  private get header_label() {
    return this.page.locator(`.login_logo`);
  }
  private get username_textbox() {
    return this.page.locator(`#user-name`);
  }
  private get password_textbox() {
    return this.page.locator(`#password`);
  }
  private get login_button() {
    return this.page.locator(`#login-button`);
  }
  private get error_label(){
    return this.page.locator('[data-test="error"]');
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
  async getValidationError(){
    await this.error_label.innerText();
  }
}
